const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");
const { randomBytes } = require("crypto");

const posts = [];

(async function () {
  await app.register(cors);

  app.get("/posts", (req, res) => {
    console.log("POSTS SERVICE: Sending posts on GET request");
    res.send({ posts: posts });
  });

  // ADD POST IN POSTS SERVICE
  app.post("/posts", async (req, res) => {
    console.log("POSTS SERVICE: Adding post in posts service on POST request");
    console.log(req.body);
    const post = req.body;
    post.id = randomBytes(4).toString("hex");
    post.comments = [];
    posts.push(post);
    res.send(JSON.stringify(post));

    // SEND EVENT 'POST CREATED' TO EVENT BUS
    try {
      await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "PostCreated",
          data: post,
        }),
      });
    } catch (err) {
      console.error(err);
    }
    console.log("POSTS SERVICE: sent PostCreated event *TO --->* EVENT BUS");
  });

  app.listen({ port: 4000 }, () => {
    console.log("Posts listening on port 4000");
  });
})();
