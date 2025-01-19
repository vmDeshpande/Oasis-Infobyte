// Check if user is already logged in
window.onload = function () {
    const username = sessionStorage.getItem("username");

    if (username) {
        // User is logged in, show the secured page
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("registerPage").classList.add("hidden");
        document.getElementById("securedPage").classList.remove("hidden");
    } else {
        // Show login page if not logged in
        document.getElementById("loginPage").classList.remove("hidden");
        document.getElementById("registerPage").classList.add("hidden");
        document.getElementById("securedPage").classList.add("hidden");
    }
};

// Switch to Register Page
document.getElementById("toRegister").addEventListener("click", () => {
    document.getElementById("registerPage").classList.remove("hidden");
    document.getElementById("loginPage").classList.add("hidden");
});

// Switch to Login Page
document.getElementById("toLogin").addEventListener("click", () => {
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("registerPage").classList.add("hidden");
});

// Register User
document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Get the existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    
    if (userExists) {
        alert("Username already exists!");
    } else if (username && password) {
        // Add the new user to the list
        users.push({ username, password });
        
        // Save the updated list back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful!");
        document.getElementById("registerPage").classList.add("hidden");
        document.getElementById("loginPage").classList.remove("hidden");
    }
});

// Login User
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Get the stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user that matches the entered username and password
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        sessionStorage.setItem("username", loginUsername); // Save username in sessionStorage
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("securedPage").classList.remove("hidden");
    } else {
        alert("Invalid credentials!");
    }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.clear(); // Clear the session storage
    document.getElementById("securedPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
});
