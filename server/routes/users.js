const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find({ username: "Marry" })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ 
        username: username, 
        password: password,
        isAdmin: false 
    });

    newUser.save()
        .then(() => res.status(200).send({message: "user added"}))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/signin').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then(user => {
            if (user.password === password){
                res.status(200).json({userInfo: user});
            } else{
                res.status(400).send({message: "password is wrong!"});
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;