const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
// Enable usage of body parser
app.use(bodyParser.json());
// Enable cors
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  // Constructing a random byte id
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("🚀 POSTS SERVICE - Listening on 4000");
});
