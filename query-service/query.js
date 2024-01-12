const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");
const axios = require("axios");

const main = async function () {
  await app.register(cors);
  const res = await axios.get("http://localhost:5000/events");
  const events = res.data;
  console.log(res.data);

  let posts = [];

  events.forEach((event) => {
    const { type, data } = event;

    if (type === "PostCreated") {
      posts.push(data);
    }

    if (type === "CommentCreated") {
      const post = posts.find((post) => post.id === data.id);
      post.comments.push(data.comment);
    }
  });

  app.get("/posts", async (req, res) => {
    res.send(posts);
  });

  app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
      posts.push(data);
      res.send({});
    }

    if (type === "CommentCreated") {
      const post = posts.find((post) => post.id === data.id);
      post.comments.push(data.comment);
      res.send(posts);

      res.send({});
    }
  });

  app.listen({ port: 4005 }, () => {
    console.log("Query service listening on port 4005");
  });
};

main();
