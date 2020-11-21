const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});