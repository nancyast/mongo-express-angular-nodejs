const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

const uri = "mongodb+srv://nhungast:H00ngNhung@cluster0.k13ut.mongodb.net/mean?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database!");
}).catch((err) => { console.log("Connection failed!", err) })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader('Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost => {
    console.log('createdPost:', createdPost)
    res.status(201).json({
      post: createdPost,
      message: 'Post added sucessfully!'
    });
  }))
});

app.get('/api/posts',(req, res, next) => {
  Post.find().then((docs) => {
    res.status(200).json({
      posts: docs,
      message: "Posts fetched successfully!"
    });
  })
})

app.delete('/api/posts/:id', (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({_id: id}).then(() => {
    res.status(200).json({
      message: "Post deleted!"
    });
  })
})

app.use((req, res, next) => {
  res.send('Hello from express!!!')
})

module.exports = app;
