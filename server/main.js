var express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
    {
        id: 1,
        text: "Hola, escribeme uu",
        author: "Seodaan",
    },
];

app.use(express.static("public"));

io.on("connection", function(socket) {
    console.log("Alguien más se está conectando con Socket.IO");
    socket.emit("messages", messages);

    socket.on("new-message", function(data) {
        messages.push(data);
        // Cambiado de io.socket.emit a io.emit
        io.emit("messages", messages); // Emitir a todos los sockets
    });
});

server.listen(8080, function() {
    console.log("El servidor está corriendo en http://localhost:8080");
});
