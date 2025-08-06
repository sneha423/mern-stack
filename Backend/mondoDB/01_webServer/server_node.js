const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((request, response) => {
    //this is quite basic like if we have 20-30 routes we will manage it differently
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("hello!!");
  }
  else if(request.url==='/about'){
    response.statusCode=200
    response.setHeader('Content-Type','text/plain')
    response.end('about us!!')
  }
  else{
    response.statusCode=404
    response.setHeader('Content-Type','text/plain')
    response.end('404 not found')
  }
});

server.listen(port, hostname, () => {
  console.log(`server is listening at http://${hostname}:${port}`);
});
