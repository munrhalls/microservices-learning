const app = require("fastify")({
  logger: true,
});
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
    res.send({ posts: posts });
  });

  app.post("/posts", async (req, res) => {
    const post = updatePost(req);

    await axios.post("http://localhost:5000/events", {
      type: "PostCreated",
      data: post,
    });

    res.send(post);
  });

  app.post("/events", (req, res) => {
    res.send({});
  });

  app.listen({ port: 4000 }, function (err, _) {
    if (err) {
      fastify.log.error(err.message);
      process.exit(1);
    }
    console.log("Posts service listening on port 4000");
  });
};

main();
