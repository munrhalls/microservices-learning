const cors = require("@fastify/cors");
const axios = require("axios");
const { randomBytes } = require("crypto");
const app = require("fastify")({
  logger: true,
});

const main = async function () {
  await app.register(cors);
  const res = await axios.get("http://localhost:5000/events");
  const events = res.data;

  const posts = events
    .filter((event) => event.type === "PostCreated")
    .map((event) => event.data);

  app.get("/posts", (req, res) => {
    res.send({ posts: posts });
  });

  app.post("/posts", async (req, res) => {
    const post = req.body;
    post.id = randomBytes(4).toString("hex");
    post.comments = [];

    await axios.post("http://localhost:5000/events", {
      type: "PostCreated",
      data: post,
    });

    res.send(post);
  });

  app.post("/events", (req, res) => {
    res.status(200).send({});
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
