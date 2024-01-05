const fastify = require("fastify");
const app = fastify();
const cors = require("cors");
const { randomBytes } = require("crypto");

const posts = [];
posts.push();

app.get("/posts", (req, res) => {
  res.send({ posts: posts });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  post.id = randomBytes(4).toString("hex");
  posts.push(post);
  res.send({ posts: posts });
});

app.listen({ port: 4000 }, () => {
  console.log("Posts listening on port 4000");
});
