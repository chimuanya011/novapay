// ===============================
// NOVAPAY FIREBASE CONFIG
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ======================================
// REPLACE THESE VALUES LATER
// ======================================

const firebaseConfig = {

apiKey: "",

authDomain: "",

projectId: "",

storageBucket: "",

messagingSenderId: "",

appId: ""

}; 
// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

// ===============================
// SERVICES
// ===============================

const auth = getAuth(app);

const db = getFirestore(app);

// ===============================
// EXPORT
// ===============================

export {

app,

auth,

db

};