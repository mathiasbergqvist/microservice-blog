const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
// Enable usage of body parser
app.use(bodyParser.json());
// Enable cors
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  // Comments lookup
  const comments = commentsByPostId[postId] || [];

  // Add comment to index
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  //Emit event
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
    },
  });

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("🚀 COMMENTS SERVICE - Listening on 4001");
});
