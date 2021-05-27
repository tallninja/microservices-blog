const { greenBright } = require("chalk");
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id: id,
    title: title,
  };

  res.status(200).send(posts[id]);
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(greenBright(`Server listening on PORT ${PORT} !`));
});
