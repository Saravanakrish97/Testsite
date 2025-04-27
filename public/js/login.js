function login(type) {
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();

  if (username === '') {
    alert('Please enter a username.');
    return;
  }

  if (type === 'guest') {
    window.location.href = `/chat.html?username=Guest-${username}`;
  } else if (type === 'user') {
    window.location.href = `/chat.html?username=${username}`;
  }
}
