const fs = require('fs');

//req = request; res = response
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
      }
      if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => { 
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];            
          //writeFile needs to be moved here so Node doesnt execute before we get the message
          fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      }s
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!!</h1></body>');
      res.write('</html>');
      res.end();
};

module.exports = requestHandler;

// exports examples

//exports.handler = requestHandler;
//module.exports.handler = requestHandler;

//module.exports = {
///   handler: requestHandler;
//    someText: 'example test'
//}

//but when you invoke, you need to invoke 'routes.handler' or 'routes.someText'

