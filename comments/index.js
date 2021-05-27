const { greenBright } = require("chalk");
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content: content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(commentsByPostId[req.params.id]);
});

const PORT = process.env.PORT | 4000;

app.listen(PORT, () => {
  console.log(greenBright(`Server listening on PORT ${PORT} !`));
});
