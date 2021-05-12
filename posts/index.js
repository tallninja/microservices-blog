const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const title = req.body;

  posts[id] = {
    id: id,
    title: title,
  };

  res.status(200).send(posts[id]);
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT} !`);
});
