const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");
const loginBtn = document.getElementById("loginBtn");

function showError(message) {
    errorBox.style.display = "block";
    errorBox.textContent = message;
}

function hideError() {
    errorBox.style.display = "none";
    errorBox.textContent = "";
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    hideError();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email.includes("@")) {
        showError("Please enter a valid email address.");
        return;
    }

    if (password.length < 8) {
        showError("Password must be at least 8 characters.");
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Signing In...";

    const loginData = {
        email,
        password
    };

    console.log("Login Data:", loginData);

    /*
    NEXT STEP

    await loginNovaPayUser(loginData);

    */

    setTimeout(() => {

        loginBtn.disabled = false;
        loginBtn.textContent = "Login";

        alert("Login UI completed.\nFirebase authentication will be connected after we rebuild firebase.js and auth.js.");

    }, 1500);

});