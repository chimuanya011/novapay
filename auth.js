// =========================================
// NOVAPAY AUTH
// =========================================

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
doc,
setDoc,
getDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// =========================================
// REGISTER USER
// =========================================

export async function registerUser(userData){

const credential = await createUserWithEmailAndPassword(

auth,
userData.email,
userData.password

);

const user = credential.user;

await setDoc(doc(db,"users",user.uid),{

uid:user.uid,

username:userData.username,

email:userData.email,

phone:userData.phone,

walletBalance:0,

rewardBalance:0,

accountStatus:"active",

createdAt:serverTimestamp()

});

return user;

}

// =========================================
// LOGIN USER
// =========================================

export async function loginUser(email,password){

const credential = await signInWithEmailAndPassword(

auth,
email,
password

);

return credential.user;

}

// =========================================
// GET USER
// =========================================

export async function getUser(uid){

const snapshot = await getDoc(doc(db,"users",uid));

if(snapshot.exists()){

return snapshot.data();

}

return null;

}

// =========================================
// LOGOUT
// =========================================

export async function logoutUser(){

await signOut(auth);

} 
// =========================================
// NOVAPAY REGISTER
// =========================================

import { registerUser } from "./auth.js";

const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const button = document.getElementById("registerBtn");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const username = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

message.className = "";
message.style.display = "none";

if (password !== confirmPassword) {

message.className = "error";
message.textContent = "Passwords do not match.";
message.style.display = "block";

return;

}

button.disabled = true;
button.textContent = "Creating Account...";

try {

await registerUser({

username,
email,
phone,
password

});

message.className = "success";
message.textContent = "Account created successfully.";

message.style.display = "block";

setTimeout(() => {

window.location.href = "login.html";

}, 2000);

} catch (error) {

message.className = "error";
message.textContent = error.message;
message.style.display = "block";

} finally {

button.disabled = false;
button.textContent = "Create Account";

}

});