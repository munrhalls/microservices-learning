const fastify = require("fastify");
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

  app.post("/comments/add-comment", (req, res) => {
    if (req.body.id == undefined) {
      return res.status(400).send("Id is required");
    }

    const { id, comment } = req.body;

    if (postsIds[id] == undefined) postsIds[id] = { comments: [] };
    if (postsIds[id] != undefined)
      postsIds[id].comments = [...postsIds[id].comments, comment];
    res.send(postsIds[id]);
  });

  app.listen({ port: 4001 }, () => {
    console.log("Comments service listening on port 4001");
  });
})();
