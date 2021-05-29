const { greenBright } = require("chalk");
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content: content });
  commentsByPostId[req.params.id] = comments;

  // send an event to the event bus
  await axios.post("http://localhost:6000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: content,
      postId: req.params.id,
    },
  });

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  res.send({});
});

const PORT = process.env.PORT | 5001;

app.listen(PORT, () => {
  console.log(greenBright(`Server listening on PORT ${PORT} !`));
});
