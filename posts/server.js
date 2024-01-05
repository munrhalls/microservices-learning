const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");
const { randomBytes } = require("crypto");

const posts = [];

(async function () {
  await app.register(cors);

  app.get("/posts", (req, res) => {
    res.send({ posts: posts });
  });

  app.post("/posts", async (req, res) => {
    const post = req.body;
    post.id = randomBytes(4).toString("hex");
    posts.push(post);
    res.send({ posts: posts });

    try {
      await fetch("http://localhost:4001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.listen({ port: 4000 }, () => {
    console.log("Posts listening on port 4000");
  });
})();
