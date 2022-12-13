const http = require('http');

const routes = require('./routes');

//create a server which have a function for request and response
const server = http.createServer(routes);

server.listen(3000);
