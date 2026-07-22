import { loginUser } from "./auth.js";

const form = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("loginError");

function showError(message){
    errorBox.style.display = "block";
    errorBox.textContent = message;
}

function hideError(){
    errorBox.style.display = "none";
    errorBox.textContent = "";
}

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    hideError();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    if(email===""){
        return showError("Enter your email address.");
    }

    if(password===""){
        return showError("Enter your password.");
    }

    loginBtn.disabled = true;

    loginBtn.textContent = "Signing In...";

    try{

        await loginUser(email,password);

        window.location.href = "dashboard.html";

    }catch(error){

        showError(error.message);

        loginBtn.disabled = false;

        loginBtn.textContent = "Login";

    }

});