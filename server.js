const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('new user', (username) => {
        users[socket.id] = username;
        io.emit('user list', Object.values(users));
        socket.broadcast.emit('announcement', `${username} has joined the chat`);
    });

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        const username = users[socket.id];
        delete users[socket.id];
        io.emit('user list', Object.values(users));
        io.emit('announcement', `${username} has left the chat`);
    });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
