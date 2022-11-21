const http = require('http');

const app =  require('./app');


const server = http.createServer(app);

server.listen(2001,console.log("App is now  working with express server"));