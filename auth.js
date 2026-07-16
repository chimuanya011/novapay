import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/fire on basejs/12.2.1/firebase-auth.js";
const fullName = document.getElementById("fullName");

const phoneNumber = document.getElementById("phoneNumber");

const email = document.getElementById("email");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const createAccountBtn = document.getElementById("createAccountBtn");
createAccountBtn.addEventListener("click", async () => {

if(
fullName.value.trim()===""||
phoneNumber.value.trim()===""||
email.value.trim()===""||
password.value===""||
confirmPassword.value===""){
alert("Please fill in all fields.");
return;
}

if(password.value!==confirmPassword.value){
alert("Passwords do not match.");
return;
} 
try{

const userCredential=
await createUserWithEmailAndPassword(

auth,

email.value.trim(),

password.value

);

alert("Account created successfully!");

window.location.href="login.html"; 
}catch(error){

alert(error.message);

}

});