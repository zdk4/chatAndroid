var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function (socket) {
    console.log('Un usuario conectado: ' + socket.id);

    socket.on('message', function (data) {
        var sockets = io.sockets.sockets;
       /* sockets.forEach(function (sock) {
            if (sock.id != socket.id) {
                sock.emit('message', {
                    message: data
                });
            }
        });*/
        socket.broadcast.emit('message', data);
    })
    socket.on('disconnect', function () {
        console.log('Usuario desconecado' + socket.id);
    })
})

http.listen(3000, function () {
    console.log('Servidor activado en el puerto 3000');
})