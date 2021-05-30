const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:5010/events", {
      type: "CommentModerated",
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

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Comment Moderation service listening on port ${PORT}`);
});
