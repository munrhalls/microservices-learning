const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");

let posts = [];

(async function () {
  await app.register(cors);

  const data = await fetch("http://localhost:4000/posts");
  posts = await data.json();

  app.get("/posts", async (req, res) => {
    res.send(posts);
  });

  app.post("/events", async (req, res) => {
    alert("RECEIVED EVENT");
    const { type, data } = req.body;
    console.log("Received event:", type);
    res.send("ok");
    // receive event: PostCreated
    // add new post to posts array
  });

  app.listen({ port: 4005 }, () => {
    console.log("Query service listening on port 4005");
  });
})();
