const { greenBright } = require("chalk");
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id: id,
    title: title,
  };

  // send event to the event bus
  await axios.post("http://localhost:6000/events", {
    type: "PostCreated",
    data: {
      id: id,
      title: title,
    },
  });

  res.status(200).send(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  res.send({});
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(greenBright(`Server listening on PORT ${PORT} !`));
});
