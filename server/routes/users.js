const router = require('express').Router();
let User = require('../models/user.model');

// Returns a list of all users from db
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Returns a list of all users from db
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
        .then(() => res.status(200).json({userInfo: newUser}))
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
            if (user.password === password){
                res.status(200).json({userInfo: user});
            } else{
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
router.route('/updatepass/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.password = req.body.password;

            user.save()
                .then(() => res.json('password successfully updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update username
router.route('/updateuser/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = user.password;

            user.save()
                .then(() => res.json('username successfully updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;