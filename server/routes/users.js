const router = require('express').Router();
let User = require('../models/user.model');
let Post = require('../models/post.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let io = require('../server.js').io;
const fs = require('fs');

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
        profileImage: req.protocol + '://' + req.get('host') + "/images/defaults/default_avatar.jpg" //Set a default profile picture
    });


    //Hash the password with a salt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {

            //Set the password to the hashed password
            newUser.password = hash;

            const token = jwt.sign({ username: username }, 'timelysecret'); //Generate a token that expires in 300 seconds (5 min)

            //Save the user the db
            newUser.save()
                .then(() => res.status(200).json({ userInfo: newUser, "token": token }))
                .catch(err => res.status(400).json('Error: ' + err));

        })
    });

});

// Checks db id username in the request exists 
// If the password is correct send a 200 status
// Otherwise throw 400 error
router.route('/signin').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then(user => {

            //Compare the password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ username: username }, 'timelysecret'); //Generate a token that expires in 300 seconds (5 min)
                    res.status(200).json({ userInfo: user, token: token });
                }
                else {
                    res.status(400).send("password is wrong!");
                }
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//Verifies the user using a token, if token matches, send in the user's info
router.route('/token').post((req, res) => {
    const token = req.body.token;

    jwt.verify(token, 'timelysecret', function (err, decoded) {
        if (!err) {
            //Find the user's details and send it the client
            User.findOne({ username: decoded.username })
                .then(user => res.json({ "isValid": true, "object": user }))
                .catch(err => res.status(400).json('Error: ' + err));

        } else {
            res.json({ "isValid": false });
        }
    })
});

// Delete account
router.route('/delete/:username').post((req, res) => {
    User.findOneAndDelete({ username: req.params.username })
        .then((user) => {
            if (user) {
                //Find all posts of that user
                Post.find({ username: req.params.username })
                    .then(posts => {
                        //Arrays for storing the results
                        let all_posts = [];
                        let img_addr = []; //Addresses of images to be deleted later


                        const IMAGE_DIR = require('path').dirname(require.main.filename) + "/images/"; //The directory for the images

                        //Push the ids of the posts
                        for (post of posts) {
                            all_posts.push(post._id);

                            if (post.type === "img") {
                                const addr_ar = post.imageURL.split('/');
                                const img_filename = addr_ar[addr_ar.length - 1];

                                const file_path = IMAGE_DIR + "posts/" + img_filename;
                                img_addr.push(file_path);
                            }
                        }

                        //Remove all posts that we have found
                        Post.deleteMany({ _id: { $in: all_posts } })
                            .then(res => {
                                if (res.deletedCount > 0) {
                                    //Notify everyone to update
                                    io.emit('update post list');


                                    //Once we have deleted the posts, remove the images from the server
                                    for (let path of img_addr) {
                                        fs.unlink(path, (err) => { if (err) { console.log(err) } });
                                    }

                                }

                                //Delete the profile picture
                                const profileImg_ar = user.profileImage.split('/');
                                if (profileImg_ar[profileImg_ar.length - 2] !== "defaults") {
                                    fs.unlink(IMAGE_DIR + "avatars/" + profileImg_ar[profileImg_ar.length - 1], (err) => { if (err) { console.log(err) } });
                                }
                            })

                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                res.json('user successfully deleted!');
            }
            else {
                res.json('ERROR: no such user found');
            }

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update password
router.route('/update/pass/:username').post((req, res) => {


    //Hash the password with a salt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            //Update the user's password
            User.findOneAndUpdate({ username: req.params.username }, { $set: { password: hash } })
                .then(() => {
                    res.json('password successfully updated!')
                })
                .catch(err => res.status(400).json('Error: ' + err));

        })
    });
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

    User.findOne({ username: username_id })
        .then(user => {

            //Get previous image and delete it

            //Get the old image filename
            const profileImg_ar = user.profileImage.split('/');
            //Delete the old profile picture
            if (profileImg_ar[profileImg_ar.length - 2] !== "defaults") {
                fs.unlink(IMAGE_DIR + "avatars/" + profileImg_ar[profileImg_ar.length - 1], (err) => { if (err) { console.log(err) } });
            }

            //Update the profile picture address with the new one
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

                    //Update all active posts so that they can render the new image
                    Post.find({ username: user.username })
                        .then(posts => {
                            for (let post of posts) {
                                io.emit("update post " + post._id);
                            }
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                }
                )
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))


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
});

//Find the posts for a certain user, and returns them in a "trending" order
router.route('/userPosts/:username').get((req, res) => {
    const username = req.params.username;

    Post.find({ username: username }).sort({ likeCount: -1 })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Verifies if the username/password combination is valid
router.route('/verifyUser').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //Find the user
    User.findOne({ username: username })
        .then(user => {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                res.json(isMatch);
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;