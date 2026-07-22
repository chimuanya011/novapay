// =========================================
// NOVAPAY AUTH ENGINE
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
deleteDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =========================================
// CREATE ACCOUNT
// =========================================

 export async function registerUser(userData){

try{

const userCredential = await createUserWithEmailAndPassword(
auth,
userData.email,
userData.password
);

const user = userCredential.user;

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

}catch(error){

if(auth.currentUser){
await deleteDoc(doc(db,"users",auth.currentUser.uid)).catch(()=>{});
}

throw error;

}

}


// =========================================
// LOGIN
// =========================================

export async function loginUser(email,password){

const userCredential = await signInWithEmailAndPassword(

auth,

email,

password

);

return userCredential.user;

}


// =========================================
// GET PROFILE
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