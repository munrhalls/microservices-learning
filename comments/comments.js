const fastify = require("fastify");
const axios = require("axios");
const cors = require("@fastify/cors");
const { randomBytes } = require("crypto");

const postsIds = {};

(async function () {
  const app = fastify();
  await app.register(cors);

  app.get("/comments", (req, res) => {
    res.send(postsIds);
  });

  app.post("/comments/add-postId", (req, res) => {
    const { id } = req.body;
    if (postsIds[id] == undefined) postsIds[id] = { comments: [] };
    res.send(postsIds[id]);
  });

  app.post("/comments/add", async (req, res) => {
    if (req.body.postId == undefined) {
      return res
        .status(400)
        .send({ request: req.body, error: "postId is required" });
    }
    const { postId: id, comment } = req.body;

    if (postsIds[id] == undefined) postsIds[id] = { comments: [] };
    if (postsIds[id] != undefined)
      postsIds[id].comments = [...postsIds[id].comments, comment];

    await axios.post("http://localhost:5000/events", {
      type: "CommentCreated",
      data: { id, comment },
    });
    res.send(postsIds);
  });

  app.post("/events", (req, res) => {
    res.send({});
  });

  app.listen({ port: 4001 }, () => {
    console.log("Comments service listening on port 4001");
  });
})();
