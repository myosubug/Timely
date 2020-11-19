const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const postSchema = new Schema({
    username: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    likeCount: { type: Number, required: true },
    dislikeCount: { type: Number, required: true },
    type: { type: String, maxlength: 4, minlength: 3, required: true },
    textContent: { type: String, minlength: 1 },
    imageURL: { type: String },
    tags: { type: Array }
});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;