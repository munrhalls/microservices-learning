const fastify = require("fastify");
const app = fastify();

app.post("/events", async (req, res) => {
  if (req.body.type === "PostCreated") {
    try {
      await fetch("http://localhost:4005/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          type: "PostCreated",
          data: req.body.data,
        },
      });
      console.log("Event 'PostCreated' received and re-sent to query-service");
    } catch (error) {
      console.log(error);
    }
  }
});

// listen for event, respond with event sent to each service
app.listen({ port: 5000 }, () => {
  console.log("Events bus listening on 5000");
});
