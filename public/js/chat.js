const socket = io();

// Get username from URL
const params = new URLSearchParams(window.location.search);
const username = params.get('username');

// Display username
document.getElementById('usernameDisplay').innerText = `Logged in as: ${username}`;

// Send message function
function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (message !== '') {
    socket.emit('chatMessage', { username, message });
    input.value = '';
  }
}

// Display incoming message
socket.on('chatMessage', (data) => {
  const messagesDiv = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
  messagesDiv.appendChild(messageElement);
  
  // Scroll to bottom
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
