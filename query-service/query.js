const fastify = require("fastify");
const app = fastify();
const cors = require("@fastify/cors");

const getPosts = async () => {
  const data = await fetch("http://localhost:4000/posts");
  const { posts } = await data.json();
  return posts;
};

// const getComments = async () => {
//   const data = await fetch("http://localhost:4001/comments");
//   const { comments } = await data.json();
//   return comments;
// };

const main = async function () {
  await app.register(cors);
  const posts = await getPosts();
  // const comments = await getComments();
  posts.forEach((post) => {
    console.log(post);
    // post.comments = comments[post.id];
  });
  console.log(posts);

  app.get("/posts", async (req, res) => {
    res.send(posts);
  });

  app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
      posts.push(data);
      res.send({});
    }
    if (type === "CommentCreated") {
      const post = posts.find((post) => post.id === data.id);
      post.comments.push(data.comment);
      res.send(posts);

      res.send({});
    }
  });

  app.listen({ port: 4005 }, () => {
    console.log("Query service listening on port 4005");
  });
};

main();
