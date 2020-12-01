let Post = require('./models/post.model');
let io = require('./server.js').io;
const fs = require('fs');

const timer = ms => new Promise(res => setTimeout(res, ms));

const IMAGE_DIR = require('path').dirname(require.main.filename) + "/images/";

(async function postPurger() {

    while (true) {
        //Find all expired posts
        await Post.find({ expiryDate: { $lte: new Date().toUTCString() } })
            .then(expiredPosts => {

                let ids = [];
                let img_addr = []; //Addresses of images to be deleted later

                for (let post of expiredPosts) {
                    ids.push(post._id);

                    if (post.type === "img") {
                        const addr_ar = post.imageURL.split('/');
                        const img_filename = addr_ar[addr_ar.length - 1];

                        const file_path = IMAGE_DIR + "posts/" + img_filename;
                        img_addr.push(file_path);
                    }
                }

                //Delete all expired posts from db
                Post.deleteMany({ _id: { $in: ids } })
                    .then(res => {
                        //If the deleteCount is greater than 0, the notify the clients
                        if (res.deletedCount > 0) {
                            io.emit('update post list');

                            //Once we have deleted the posts, remove the images from the server
                            for (let path of img_addr) {
                                fs.unlink(path, (err) => { if (err) { console.log(err) } });
                            }
                        }


                    })
                    .catch(err => console.log(err));


            })
            .catch(err => console.log(err));

        await timer(500); // sleep as to not overload the server
    }


})();