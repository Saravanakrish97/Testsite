// This script handles login and guest functionality
function joinWithLogin(event) {
    event.preventDefault();  // Prevent form submission
    let username = document.getElementById("username").value;
    if (username === "") {
        alert("Please enter your name!");
        return;
    }
    localStorage.setItem("username", username);  // Store username locally
    window.location.href = "/chatroom";  // Redirect to the chatroom
}

function joinAsGuest(event) {
    event.preventDefault();
    localStorage.setItem("username", "Guest_" + Math.floor(Math.random() * 10000));  // Random Guest Username
    window.location.href = "/chatroom";  // Redirect to the chatroom
}
