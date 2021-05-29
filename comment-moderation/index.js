const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", (req, res) => {});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Comment Moderation service listening on port ${PORT}`);
});
