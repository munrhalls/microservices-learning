const fastify = require("fastify");
const app = fastify();
const axios = require("axios");
const { randomBytes } = require("crypto");

const events = [];

app.post("/events", async (req, res) => {
  const event = {
    id: randomBytes(4).toString("hex"),
    type: req.body.type,
    data: req.body.data,
  };
  events.push(event);

  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4005/events", event);
  console.log(`Event: ${event.type} with data ${Object.entries(event.data)} `);

  res.send(event);
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen({ port: 5000 }, () => {
  console.log("Events bus listening on 5000");
});
