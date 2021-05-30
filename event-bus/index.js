const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const eventsDataStore = [];

app.post("/events", (req, res) => {
  const event = req.body;

  console.log(`Received Event: ${event.type}`);

  eventsDataStore.push(event);

  axios.post("http://localhost:5000/events", event); // posts-service
  axios.post("http://localhost:5001/events", event); // comments-service
  axios.post("http://localhost:5002/events", event); // querry-service
  axios.post("http://localhost:5003/events", event); // comment moderation service

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(eventsDataStore);
});

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
