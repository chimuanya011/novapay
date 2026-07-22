import { createNovaPayAccount } from "./auth.js";

const form = document.getElementById("registerForm");
const button = document.getElementById("createAccountBtn");
const errorBox = document.getElementById("registerError");

function showError(message){

errorBox.style.display="block";
errorBox.textContent=message;

}

function hideError(){

errorBox.style.display="none";
errorBox.textContent="";

}

form.addEventListener("submit",async(e)=>{

e.preventDefault();

hideError();

const username=document.getElementById("username").value.trim();

const email=document.getElementById("email").value.trim();

const phone=document.getElementById("phone").value.trim();

const password=document.getElementById("password").value;

const confirmPassword=document.getElementById("confirmPassword").value;

if(username.length<3){

showError("Username must contain at least 3 characters.");

return;

}

if(!email.includes("@")){

showError("Enter a valid email address.");

return;

}

if(phone.length<10){

showError("Enter a valid phone number.");

return;

}

if(password.length<8){

showError("Password must be at least 8 characters.");

return;

}

if(password!==confirmPassword){

showError("Passwords do not match.");

return;

}

button.disabled=true;

button.textContent="Creating Account...";

try{

await createNovaPayAccount({

username,

email,

phone,

password

});

alert("Account created successfully.");

window.location.href="login.html";

}catch(error){

showError(error.message);

}

button.disabled=false;

button.textContent="Create Account";

});