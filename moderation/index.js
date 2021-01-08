const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// Enable usage of body parser
app.use(bodyParser.json());

app.post("/events", (req, res) => {});

app.listen(4003, () => {
  console.log("🚀 MODERATION SERVICE - Listening on 4003");
});
