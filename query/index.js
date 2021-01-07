const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// Enable usage of body parser
app.use(bodyParser.json());
// Enable cors
app.use(cors());

app.get("/posts", (req, res) => {});

app.post("/events", (req, res) => {});

app.listen(4002, () => {
  console.log("🚀 QUERY SERVICE - Listening on 4001");
});
