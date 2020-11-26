const router = require('express').Router();
let Post = require('../models/post.model');
let io = require('../server.js').io;


const IMAGE_DIR = require('path').dirname(require.main.filename) + "/images/";

//Returns all posts in the order that they are in the db
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Returns a Post object by ID
router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Handles disliking the post and updates the db
router.route('/action-post/:action/:id/:username').post((req, res) => {
    const id = req.params.id;
    const username = req.params.username;
    const action = req.params.action;

    const ADD_TIME = 0.5 * 60000; //30 seconds to add

    //Find the post
    Post.findById(id)
        .then(post => {
            //Get db info that we need to update
            let likedUsers = post.likedUsers;
            let dislikedUsers = post.dislikedUsers;
            let likeCount = post.likeCount;
            let dislikeCount = post.dislikeCount;
            let expiryDate = new Date(post.expiryDate).getTime();


            //Check if we are liking a post
            if (action === "like") {

                if (dislikedUsers.has(username)) {
                    dislikedUsers.delete(username);
                    dislikeCount--;
                    expiryDate += ADD_TIME;
                }

                //Check if the user already liked, as to not like twice, if he exists, remove him and subtract the time
                if (likedUsers.has(username)) {
                    likedUsers.delete(username);
                    likeCount--;
                    expiryDate -= ADD_TIME;
                }
                else {
                    likedUsers.set(username);
                    likeCount++;
                    expiryDate += ADD_TIME;
                }

            }
            else if (action === "dislike") {
                //Check if the user has disliked the post previously, and if so, remove him and update the time
                if (likedUsers.has(username)) {
                    likedUsers.delete(username);
                    likeCount--;
                    expiryDate -= ADD_TIME;
                }

                if (dislikedUsers.has(username)) {
                    dislikedUsers.delete(username);
                    dislikeCount--;
                    expiryDate += ADD_TIME;
                }
                else {
                    dislikedUsers.set(username);
                    dislikeCount++;
                    expiryDate -= ADD_TIME;
                }

            }



            //Find the post and update
            Post.findOneAndUpdate({ _id: id }, {
                $set: {
                    likedUsers: likedUsers,
                    dislikedUsers: dislikedUsers,
                    likeCount: likeCount,
                    dislikeCount: dislikeCount,
                    expiryDate: new Date(expiryDate).toUTCString()
                },
            }, { upsert: false }, (err) => { if (err) { console.log(err) } })
                .then(() => {
                    //TODO: Notify with a socket
                    const update_event_name = "update post " + id;
                    io.emit(update_event_name);
                    res.status(200).json(action + " post");
                }
                );


        }

        ).catch(err => res.status(400).json('Error: ' + err));

});

//uploads a post for the specified post id
router.route('/upload-post/:postid').post((req, res) => {
    const image = req.files.myFile;
    const post_id = req.params.postid;

    const ext_ar = image.name.split('.');
    const ext = ext_ar[ext_ar.length - 1]; //Get the last element
    image.name = post_id + "." + ext;
    const fileName = image.name;

    const path = IMAGE_DIR + "posts/" + fileName;
    image.mv(path); //Move the file to the specified path

    //Get the URL for the post
    const img_url = req.protocol + '://' + req.get('host') + "/images/posts/" + fileName;
    //update the post with the specified id
    Post.findOneAndUpdate({ _id: post_id }, { $set: { imageURL: img_url } })
        .then(() => {
            //Update the post in case of race conditions
            const event_name = "update post " + post_id;
            io.emit(event_name);
        })
        .catch(err => console.log(err));
});

//Adds a post to the db
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const dateCreated = req.body.dateCreated;
    const type = req.body.type;
    const textContent = req.body.textContent;
    const tags = req.body.tags;

    //Calculate expirty date
    const MAX_MIN = 5 * 60; // 5 min (MAX time for post)
    const MAX_TIME_ADD = MAX_MIN * 1000; //5 minutes (to add)

    const expiryDate = new Date(new Date(dateCreated).getTime() + MAX_TIME_ADD).toUTCString();

    const likedUsers = new Map();
    const dislikedUsers = new Map();
    const newPost = new Post({
        username: username,
        expiryDate: expiryDate,
        dateCreated: dateCreated,
        maxTime: MAX_MIN,
        likeCount: 0,
        dislikeCount: 0,
        type: type,
        textContent: textContent,
        imageURL: '',
        tags: tags,
        likedUsers: likedUsers,
        dislikedUsers: dislikedUsers
    });

    //Save the file if we uploaded a file


    newPost.save()
        .then((post) => {
            io.emit('update post list');
            res.json(post._id);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//ADMIN FUNCTIONALITY

//Add or subtract time from post
router.route('/time/:action').post((req, res) => {

    const id = req.body.id;
    const time_mil = req.body.time * 1000;

    //Get the post by id, and get its expiry time
    Post.findById(id)
        .then(post => {
            let expiryDate = new Date(post.expiryDate).getTime();

            if (req.params.action === "add") {
                expiryDate += time_mil;
            }
            else if (req.params.action === "subtract") {
                expiryDate -= time_mil;
            }

            //Update the expirty time with the new value
            Post.findByIdAndUpdate(id, { $set: { expiryDate: new Date(expiryDate).toUTCString() } })
                .then(post => {
                    res.status(200).json("Updated post " + req.params.action);
                    io.emit('update post ' + req.body.id)
                })
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete post
router.route('/delete').post((req, res) => {
    Post.findByIdAndDelete(req.body.id)
        .then(post => {
            res.status(200).json("Deleted post " + post);
            io.emit('update post list delete');
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

//Promote a post (i.e. add 100k likes to the post)
router.route('/promote/:id').post((req, res) => {
    const LIKE_COUNT = 100000;
    Post.findByIdAndUpdate(req.params.id, { $inc: { likeCount: LIKE_COUNT } })
        .then((post) => {
            res.status(200).json("Deleted post " + post);
            io.emit('update post ' + req.params.id);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;