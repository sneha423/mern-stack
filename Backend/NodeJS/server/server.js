const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const server = http.createServer((request, response) => {
  const filePath = path.join(
    __dirname,
    request.url === "/" ? "index.html" : request.url
  );

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
  };
  const contentType = mimeTypes[extName] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("404: file not found!!");
      } else {
        response.writeHead(500);
        response.end(`Server Error: ${error.code}`);
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});
server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
//both response and request have two parts: head part and body part head-> consists statuscode, body->consists the whole content
