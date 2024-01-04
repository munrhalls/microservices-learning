const http = require("http");
const fs = require("fs");
const path = require("path");
http
  .createServer((req, res) => {
    const filePath = path.join(__dirname, "index.html");
    const contentType = "text/html";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  })
  .listen(3000, () => console.log("Server is running on port 3000"));
