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


router.route('/upload-post').post((req, res) => {
    const image = req.files.myFile;
    const fileName = req.files.myFile.name;

    const path = IMAGE_DIR + "posts/" + fileName;
    image.mv(path); //Move the file to the specified path
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
        tags: tags,
        likedUsers: likedUsers,
        dislikedUsers: dislikedUsers
    });

    //Save the file if we uploaded a file


    newPost.save()
        .then(() => {
            io.emit('update post list');
            res.json('Post added!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;