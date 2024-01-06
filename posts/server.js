const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");
const { randomBytes } = require("crypto");

const posts = [];

(async function () {
  await app.register(cors);

  app.get("/posts", (req, res) => {
    console.log("Sending posts");
    res.send({ posts: posts });
  });

  app.post("/posts", async (req, res) => {
    console.log("Adding post");

    console.log(req.body);
    const post = req.body;

    post.id = randomBytes(4).toString("hex");
    post.comments = [];

    posts.push(post);
    res.send(JSON.stringify(post));

    // try {
    //   await fetch("http://localhost:4001/comments", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ postId: post.id }),
    //   });
    // } catch (err) {
    //   console.error(err);
    // }

    // try {
    //   await fetch("http://localhost:5000/events", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       type: "PostCreated",
    //       data: post,
    //     }),
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  });

  app.listen({ port: 4000 }, () => {
    console.log("Posts listening on port 4000");
  });
})();
