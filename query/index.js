const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id: id, title: title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id: id, content: content, status: status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.content = content;
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  // console.log(posts);
  res.send({});
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, async () => {
  console.log(`Query Service listening on PORT ${PORT}`);

  const res = await axios.get("http://localhost:5010/events");

  for (let event of res.data) {
    console.log(`Processing event: ${event.type}`);
    const { type, data } = event;
    handleEvent(type, data);
  }
});
