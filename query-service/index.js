const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id: id, title: title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id: id, content: content });
  }

  console.log(posts);
  res.send({});
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Query Service listening on PORT ${PORT}`);
});
