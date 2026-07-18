import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
// ===============================
// PAGE DETECTION
// ===============================

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// ===============================
// REGISTER USER
// ===============================

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;
                        await setDoc(doc(db, "users", user.uid), {

                uid: user.uid,

                fullName: fullName,

                phoneNumber: phoneNumber,

                email: email,

                walletBalance: 0,

                accountName: "",

                accountNumber: "",

                bankName: "",

                reservedAccount: false,

                transactions: [],

                createdAt: new Date().toISOString()

            });

            alert("Registration Successful!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

} // ===============================
// LOGIN USER
// ===============================

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            const userDoc =
                await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {

                alert("User profile not found.");

                return;

            }

            const userData = userDoc.data();

            localStorage.setItem(
                "novapayUser",
                JSON.stringify(userData)
            );

            window.location.href = "dashboard.html";

        } catch (error) {

            alert(error.message);

        }

    });

} 
// ===============================
// LOGOUT
// ===============================

window.logout = async function () {

    try {

        await signOut(auth);

        localStorage.removeItem("novapayUser");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

};

// ===============================
// AUTH STATE
// ===============================

onAuthStateChanged(auth, (user) => {

    const protectedPages = [
        "dashboard.html",
        "wallet.html",
        "funding.html",
        "history.html",
        "profile.html",
        "settings.html",
        "notifications.html",
        "support.html"
    ];

    const currentPage =
        window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage) && !user) {

        window.location.href = "login.html";

    }

});
