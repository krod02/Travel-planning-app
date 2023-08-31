var http = require('http');// telling server to use http

http.createServer(function (req, res) {//creating server connection
  res.writeHead(200, {'Content-Type': 'text/plain'});//sending header to client
  res.end('Hello World!');//sending response to client
}).listen(8080);//listening to port 8080