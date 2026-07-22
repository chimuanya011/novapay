const form = document.getElementById("registerForm");
const errorBox = document.getElementById("registerError");
const button = document.getElementById("createAccountBtn");

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

const username = document.getElementById("username").value.trim();

const email = document.getElementById("email").value.trim();

const phone = document.getElementById("phone").value.trim();

const password = document.getElementById("password").value;

const confirmPassword = document.getElementById("confirmPassword").value;

if(username.length < 3){

showError("Username must contain at least 3 characters.");

return;

}

if(!email.includes("@")){

showError("Please enter a valid email address.");

return;

}

if(phone.length < 10){

showError("Please enter a valid phone number.");

return;

}

if(password.length < 8){

showError("Password must be at least 8 characters.");

return;

}

if(password !== confirmPassword){

showError("Passwords do not match.");

return;

}

button.disabled = true;

button.textContent = "Creating Account...";

const userData = {

username,

email,

phone,

password

};

console.log("Registration Data:", userData);

/*
Later this will become:

await createNovaPayAccount(userData);

*/

setTimeout(()=>{

button.disabled = false;

button.textContent = "Create Account";

alert("Registration UI completed.\nFirebase will be connected after we rebuild the authentication engine.");

},1500);

});