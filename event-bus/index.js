const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log(`Received Event: ${event.type}`);

  axios.post("http://localhost:5000/events", event); //posts-service
  axios.post("http://localhost:5001/events", event); //comments-service
  axios.post("http://localhost:5002/events", event); //querry-service

  res.send({ status: "OK" });
});

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
