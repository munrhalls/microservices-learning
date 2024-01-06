const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");

let posts = [];

(async function () {
  await app.register(cors);

  const data = await fetch("http://localhost:4000/posts");
  posts = await data.json();
  // SENDING EFFICIENT-REQUESTS FORMAT DATA
  app.get("/posts", async (req, res) => {
    res.send(posts);
  });
  // RECEIVING EVENTS FROM EVENT BUS
  app.post("/events", async (req, res) => {
    console.log("QUERY SERVICE: RECEIVING EVENT FROM EVENT BUS");
    console.log("QUERY SERVICE: RECEIVING EVENT FROM EVENT BUS");
    console.log("QUERY SERVICE: RECEIVING EVENT FROM EVENT BUS");
    console.log("QUERY SERVICE: RECEIVING EVENT FROM EVENT BUS");

    const { type, data } = req.body;
    console.log("Received event:", type);
  });

  app.listen({ port: 4005 }, () => {
    console.log("Query service listening on port 4005");
  });
})();
