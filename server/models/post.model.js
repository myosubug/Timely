const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const postSchema = new Schema({
    username: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    maxTime: { type: Number, required: true },
    likeCount: { type: Number, required: true },
    dislikeCount: { type: Number, required: true },
    type: { type: String, maxlength: 4, minlength: 3, required: true },
    textContent: { type: String },
    imageURL: { type: String },
    tags: { type: Array },
    likedUsers: { type: Map, required: true },
    dislikedUsers: { type: Map, required: true }
});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;