const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");

const getPosts = async () => {
  await app.register(cors);
  const data = await fetch("http://localhost:4000/posts");
  const { posts } = await data.json();
  return posts;
};

(async function () {
  const posts = await getPosts();

  app.get("/posts", async (req, res) => {
    res.send(posts);
  });

  app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    console.log("TYPE CHECK", req.body);
    console.log(type === "PostCreated");
    if (type === "PostCreated") {
      console.log("?");
      console.log("Data to be pushed: ", data);

      try {
        console.log("POSTS: ", posts);
        debugger;
        posts.push(data);
      } catch (e) {
        console.log("Error: ", e);
      }
      console.log("Updating posts, if check passes, posts: ", posts);
    }
  });

  app.listen({ port: 4005 }, () => {
    console.log("Query service listening on port 4005");
  });
})();
