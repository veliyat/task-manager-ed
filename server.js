const http = require('http');
const app = require('./app');

const PORT = 80;

const server = http.createServer(app);

server.listen(PORT, function () {
    console.log('Server listening to port ' + PORT);
});