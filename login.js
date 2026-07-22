import { loginNovaPayUser } from "./auth.js";

const form = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("loginError");

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

const identifier=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

if(identifier===""){

showError("Enter your email or phone number.");

return;

}

if(password.length<8){

showError("Password must be at least 8 characters.");

return;

}

loginBtn.disabled=true;

loginBtn.textContent="Signing In...";

try{

await loginNovaPayUser(identifier,password);

window.location.href="dashboard.html";

}catch(error){

showError(error.message);

}

loginBtn.disabled=false;

loginBtn.textContent="Login";

});