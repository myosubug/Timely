const router = require('express').Router();
let Post = require('../models/post.model');


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

    const newPost = new Post({
        username: username,
        expiryDate: expiryDate,
        dateCreated: dateCreated,
        maxTime: MAX_MIN,
        likeCount: 0,
        dislikeCount: 0,
        type: type,
        textContent: textContent,
        tags: tags
    });

    //Save the file if we uploaded a file


    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;