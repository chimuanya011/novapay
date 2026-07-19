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

// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const phoneNumber =
            document.getElementById("phoneNumber").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

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

                fullName,

                phoneNumber,

                email,

                walletBalance: 0,

                accountNumber: "",

                accountName: "",

                bankName: "",

                reservedAccount: false,

                createdAt: new Date().toISOString()

            });

            alert("Registration Successful!");

            window.location.href = "login.html";

        }

        catch (error) {

            alert(error.message);

        }

    });

}

// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

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

            localStorage.setItem(
                "novapayUser",
                JSON.stringify(userDoc.data())
            );

            window.location.href = "dashboard.html";

        }

        catch (error) {

            alert(error.message);

        }

    });

}

// =========================
// LOGOUT
// =========================

window.logout = async function () {

    await signOut(auth);

    localStorage.removeItem("novapayUser");

    window.location.href = "login.html";

};

// =========================
// PROTECTED PAGES
// =========================

onAuthStateChanged(auth, (user) => {

    const protectedPages = [

        "dashboard.html",

        "wallet.html",

        "history.html",

        "profile.html",

        "settings.html",

        "funding.html"

    ];

    const page =
        window.location.pathname.split("/").pop();

    if (protectedPages.includes(page) && !user) {

        window.location.href = "login.html";

    }

});