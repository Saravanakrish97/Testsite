const socket = io();

function sendMessage() {
    const input = document.getElementById('message');
    const msg = input.value.trim();
    if (msg !== '') {
        socket.emit('chat message', msg);
        input.value = '';
    }
}

socket.on('chat message', function(msg) {
    const chatbox = document.getElementById('chatbox');
    const div = document.createElement('div');
    div.textContent = msg;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
});
