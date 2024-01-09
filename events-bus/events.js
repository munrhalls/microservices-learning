const fastify = require("fastify");
const app = fastify();
const axios = require("axios");

app.post("/events", async (req, res) => {
  const event = {
    type: req.body.type,
    data: req.body.data,
  };

  console.log(
    `Event: ${event.type} with data ${Object.entries(
      event.data
    )} sending to 3 services: posts, comments, query service.`
  );
  // posts 4000 / comments 4001 / query service 4005 / events bus 5000
  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4005/events", event);

  res.send({});
});

app.listen({ port: 5000 }, () => {
  console.log("Events bus listening on 5000");
});
