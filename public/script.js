const socket = io();
let username = '';

function enterChat() {
    const input = document.getElementById('username');
    username = input.value.trim();
    if (username !== '') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        socket.emit('new user', username);
    }
}

function sendMessage() {
    const input = document.getElementById('message');
    const msg = input.value.trim();
    if (msg !== '') {
        socket.emit('chat message', { user: username, text: msg });
        input.value = '';
    }
}

socket.on('chat message', function(data) {
    const chatbox = document.getElementById('chatbox');
    const div = document.createElement('div');
    div.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
});

socket.on('user list', function(users) {
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        usersList.appendChild(li);
    });
});

socket.on('announcement', function(msg) {
    const chatbox = document.getElementById('chatbox');
    const div = document.createElement('div');
    div.style.color = 'gray';
    div.textContent = msg;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
});
