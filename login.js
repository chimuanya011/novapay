// =========================================
// NOVAPAY LOGIN
// =========================================

import { loginUser } from "./auth.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const button = document.getElementById("loginBtn");

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// =========================================
// SHOW / HIDE PASSWORD
// =========================================

togglePassword.addEventListener("click", () => {

if (password.type === "password") {

password.type = "text";
togglePassword.textContent = "🙈";

} else {

password.type = "password";
togglePassword.textContent = "👁";

}

});

// =========================================
// LOGIN
// =========================================

form.addEventListener("submit", async (e) => {

e.preventDefault();

message.className = "";
message.style.display = "none";

button.disabled = true;
button.textContent = "Signing In...";

try {

const user = await loginUser(

document.getElementById("email").value.trim(),
password.value

);

message.className = "success";
message.textContent = "Login successful!";
message.style.display = "block";

setTimeout(() => {

window.location.href = "dashboard.html";

}, 1500);

} catch (error) {

message.className = "error";

switch (error.code) {

case "auth/invalid-credential":
message.textContent = "Invalid email or password.";
break;

case "auth/user-not-found":
message.textContent = "Account not found.";
break;

case "auth/wrong-password":
message.textContent = "Incorrect password.";
break;

case "auth/invalid-email":
message.textContent = "Invalid email address.";
break;

default:
message.textContent = error.message;

}

message.style.display = "block";

} finally {

button.disabled = false;
button.textContent = "Login";

}

});