import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js"; 
const email =
document.getElementById("email");

const password =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn"); 
loginBtn.addEventListener("click", async () => {

if(
email.value.trim()===""||
password.value===""){
alert("Please enter your email and password.");
return;
} 
try {

const userCredential =
await signInWithEmailAndPassword(

auth,

email.value.trim(),

password.value

);

alert("Login successful!");

window.location.href = "dashboard.html"; 
}catch(error){

alert(error.message);

}

});