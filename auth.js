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
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =========================================
// CREATE ACCOUNT
// =========================================

export async function createNovaPayAccount(userData){

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

emailVerified:false,

phoneVerified:false,

accountStatus:"pending",

createdAt:new Date().toISOString()

});

return user;

} 
// =========================================
// LOGIN USING EMAIL OR PHONE
// =========================================

export async function loginNovaPayUser(identifier,password){

let email = identifier;

if(!identifier.includes("@")){

const q = query(

collection(db,"users"),

where("phone","==",identifier)

);

const result = await getDocs(q);

if(result.empty){

throw new Error("Phone number not found.");

}

email = result.docs[0].data().email;

}

const userCredential = await signInWithEmailAndPassword(

auth,

email,

password

);

const profile = await getUserProfile(userCredential.user.uid);

if(profile && !profile.phoneVerified){

throw new Error("Please verify your phone number before logging in.");

}

return userCredential.user;

}

// =========================================
// GET USER PROFILE
// =========================================

export async function getUserProfile(uid){

const snapshot = await getDoc(doc(db,"users",uid));

if(snapshot.exists()){

return snapshot.data();

}

return null;

}

// =========================================
// LOGOUT
// =========================================

export async function logoutNovaPay(){

await signOut(auth);

}