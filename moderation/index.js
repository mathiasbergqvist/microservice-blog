const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// Enable usage of body parser
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const ILLEGAL_WORD = "orange";
    const status = data.content.includes(ILLEGAL_WORD)
      ? "rejected"
      : "approved";

    // Emit event
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });

    res.send({});
  }
});

app.listen(4003, () => {
  console.log("🚀 MODERATION SERVICE - Listening on 4003");
});
