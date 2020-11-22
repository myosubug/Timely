let Post = require('./models/post.model');
let io = require('./server.js').io;

const timer = ms => new Promise(res => setTimeout(res, ms));

(async function postPurger() {

    while (true) {
        //Find all expired posts
        await Post.find({ expiryDate: { $lte: new Date().toUTCString() } })
            .then(expiredPosts => {

                let ids = [];
                for (post of expiredPosts) {
                    ids.push(post._id);
                }

                //console.log(ids);
                //Delete all expired posts from db
                Post.deleteMany({ _id: { $in: ids } })
                    .then(res => {
                        //If the deleteCount is greater than 0, the notify the clients
                        if (res.deletedCount > 0) {
                            io.emit('update post list delete');
                        }


                    })
                    .catch(err => console.log(err));


            })
            .catch(err => console.log(err));

        await timer(500); // sleep as to not overload the server
    }


})();