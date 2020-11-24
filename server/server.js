const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//For Socket.io
const http = require("http").createServer(app);
const io = exports.io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
});


app.use(cors());
app.use(fileupload());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
const connection = mongoose.connection;


connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

//Serve files (or images)
app.get('/images/:type/:filename', (req, res) => {

    res.sendFile(__dirname + '/images/' + req.params.type + '/' + req.params.filename);
});

//Call the post purger script to execute
require('./postPurger.js');

http.listen(port, () => {
    console.log("Listening on port " + port);
});