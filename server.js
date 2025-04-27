const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve static files from "public" folder (or wherever your HTML files are)
app.use(express.static('public'));

// Default route (optional)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    // your chat code here
});

// Start server
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
