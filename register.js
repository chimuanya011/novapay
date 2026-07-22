import { registerUser } from "./auth.js";

const form = document.getElementById("registerForm");
const button = document.getElementById("createAccountBtn");
const errorBox = document.getElementById("registerError");

function showError(message){
    errorBox.style.display = "block";
    errorBox.textContent = message;
}

function hideError(){
    errorBox.style.display = "none";
    errorBox.textContent = "";
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    hideError();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(username.length < 3){
        return showError("Username must be at least 3 characters.");
    }

    if(!email.includes("@")){
        return showError("Enter a valid email address.");
    }

    if(phone.length < 10){
        return showError("Enter a valid phone number.");
    }

    if(password.length < 8){
        return showError("Password must be at least 8 characters.");
    }

    if(password !== confirmPassword){
        return showError("Passwords do not match.");
    }

    button.disabled = true;
    button.textContent = "Creating Account...";

    try{

        await registerUser({
            username,
            email,
            phone,
            password
        });

        window.location.href = "dashboard.html";

    }catch(error){

        showError(error.message);

        button.disabled = false;
        button.textContent = "Create Account";

    }

});