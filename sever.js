const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => { socket.join(roomId); });
    socket.on('roll', (data) => {
        io.to(data.roomId).emit('opponent-rolled', data.value);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Server is running...'));
