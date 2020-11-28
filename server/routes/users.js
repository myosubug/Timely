const router = require('express').Router();
let User = require('../models/user.model');
let Post = require('../models/post.model');

const IMAGE_DIR = require('path').dirname(require.main.filename) + "/images/";


// Returns a list of all users from db
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Finds user by their username
router.route('/finduser/:username').get((req, res) => {
    User.findOne({ username: req.params.username })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Returns a user object by their ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Create new user and save to db
// And return new user added
router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({
        username: username,
        password: password,
        isAdmin: false,
        profileImage: ""
    });

    newUser.save()
        .then(() => res.status(200).json({ userInfo: newUser }))
        .catch(err => res.status(400).json('Error: ' + err));

});

// Checks db id username in the request exists 
// If the password is correct send a 200 status
// Otherwise throw 400 error
router.route('/signin').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then(user => {
            if (user.password === password) {
                res.status(200).json({ userInfo: user });
            } else {
                res.status(400).send("password is wrong!");
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete account
router.route('/delete/:username').post((req, res) => {
    User.findOneAndDelete({ username: req.params.username })
        .then(() => res.json('user successfully deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update password
router.route('/update/pass/:username').post((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            user.password = req.body.password;

            user.save()
                .then(() => res.json('password successfully updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update username
router.route('/update/username/:username').post((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            user.username = req.body.username;
            user.save()
                .then(() => res.json('username successfully updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//uploads a User for the specified User id
router.route('/upload-profile/:username').post((req, res) => {
    const image = req.files.myFile;
    const username_id = req.params.username;

    const ext_ar = image.name.split('.');
    const ext = ext_ar[ext_ar.length - 1]; //Get the last element
    image.name = username_id + "." + ext;
    const fileName = image.name;

    const path = IMAGE_DIR + "avatars/" + fileName;
    image.mv(path); //Move the file to the specified path

    //Get the URL for the User
    const img_url = req.protocol + '://' + req.get('host') + "/images/avatars/" + fileName;
    //update the User with the specified id
    User.findOneAndUpdate({ username: username_id }, { $set: { profileImage: img_url } })
        .then(user => {
            const url = user.profileImage;
            res.json(url);
        }
        )
        .catch(err => console.log(err));
});

// Determines the join date of the user
// Finds user by their username
router.route('/finduser/join-date/:username').get((req, res) => {
    User.findOne({ username: req.params.createdAt })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Promote user
// Finds user by their username and set their isAdmin to true
router.route('/promote/:username').post((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            user.isAdmin = true;
            user.save()
                .then(() => res.json('user successfully promoted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Demote user
// Finds user by their username and set their isAdmin to false 
router.route('/demote/:username').post((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            user.isAdmin = false;
            user.save()
                .then(() => res.json('user successfully demoted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Find the number of posts that the user currently has
router.route('/numPosts/:username').get((req, res) => {
    const username = req.params.username;

    Post.find({ username: username })
        .then(posts => {
            res.json(posts.length);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;