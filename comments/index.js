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

  comments.push({ id: commentId, content: content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  // send an event to the event bus
  await axios.post("http://localhost:5010/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  // console.log(event);
  const { type, data } = event;
  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const postComments = commentsByPostId[postId];

    const comment = postComments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://localhost:5010/events", {
      type: "CommentUpdated",
      data: {
        id: id,
        content: content,
        postId: postId,
        status: status,
      },
    });
  }

  res.send({});
});

const PORT = process.env.PORT | 5001;

app.listen(PORT, () => {
  console.log(greenBright(`Server listening on PORT ${PORT} !`));
});
