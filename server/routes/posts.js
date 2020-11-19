const router = require('express').Router();
let Post = require('../models/post.model');


router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const dateCreated = req.body.dateCreated;
    const type = req.body.type;
    const textContent = req.body.textContent;
    const tags = req.body.tags;

    //Calculate expirty date
    const MAX_TIME = 5 * 60000; //5 minutes

    const expiryDate = new Date(new Date(dateCreated).getTime() + MAX_TIME).toUTCString();

    const newPost = new Post({
        username: username,
        expiryDate: expiryDate,
        dateCreated: dateCreated,
        likeCount: 0,
        dislikeCount: 0,
        type: type,
        textContent: textContent,
        tags: tags
    });


    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;