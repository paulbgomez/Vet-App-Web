const http = require('http');
const requestHandler = require('./req-handler');
const server = http.createServer(requestHandler);

server.listen(5000, () => {
  console.log('server is listening on port 5000');
});
