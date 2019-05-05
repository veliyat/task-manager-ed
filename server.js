require('dotenv').config();
const http = require('http');
const app = require('./app');
const chalk = require('chalk');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, function () {
    console.log(chalk.blue('Server listening to port ' + PORT));
});