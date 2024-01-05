const fs = require("fs");
const path = require("path");
const fastify = require("fastify");

const getContentType = function (extname) {
  switch (extname) {
    case ".html":
      return "text/html";
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    default:
      return "text/plain";
  }
};

const server = fastify();

server.get("*", (req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.code(404).send("File not found");
      } else {
        res.code(500).send("Server error");
      }
    } else {
      res.header("Content-Type", contentType).send(content);
    }
  });
});

server.listen({ port: 3000 }, () => {
  console.log("Frontend service listening on port 3000");
});
