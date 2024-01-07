const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const posts = [];

const updatePost = (req) => {
  const post = req.body;
  post.id = randomBytes(4).toString("hex");
  post.comments = [];
  return post;
};

const main = async function () {
  await app.register(cors);

  app.get("/posts", (req, res) => {
    console.log("POSTS SERVICE: Sending posts on GET request");
    res.send({ posts: posts });
  });

  app.post("/posts", async (req, res) => {
    console.log("POSTS SERVICE: Adding post in posts service on POST request");
    const post = updatePost(req);
    const postUpdate = JSON.stringify(post);
    posts.push(post);
    res.send(postUpdate);
    await axios.post("http://localhost:5000/events", postUpdate);

    console.log("POSTS SERVICE: sent PostCreated event *TO --->* EVENT BUS");
  });

  app.listen({ port: 4000 }, () => {
    console.log("Posts listening on port 4000");
  });
};

main();
