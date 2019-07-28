const app = require('./server');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

module.exports = {
    io,
    http,
};
