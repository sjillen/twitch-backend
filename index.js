const { http, io } = require('./app/socket');
const Daemon = require('./app/daemon');
const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
io.on('connect', function(socket) {
    socket.emit('hi', 'hi');
});
new Daemon(io).run();
