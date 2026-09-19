const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {

        loginMessage.textContent =
            "Please enter your username and password.";

        return;
    }

    window.location.href = "dashboard.html";
});