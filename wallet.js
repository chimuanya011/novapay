import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const balance = document.getElementById("walletBalance");
const bankName = document.getElementById("bankName");
const accountNumber = document.getElementById("accountNumber");
const accountName = document.getElementById("accountName");
const generateBtn = document.getElementById("generateAccountBtn");

let currentUser = null;

// =========================
// LOAD WALLET
// =========================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();

    balance.textContent =
        "₦" + Number(data.walletBalance).toLocaleString();

    if (data.reservedAccount) {

        bankName.textContent = data.bankName;

        accountNumber.textContent = data.accountNumber;

        accountName.textContent = data.accountName;

        generateBtn.style.display = "none";

    }

});

// =========================
// GENERATE ACCOUNT
// =========================

generateBtn.addEventListener("click", async () => {

    try {

        const userRef = doc(db, "users", currentUser.uid);

        const userSnap = await getDoc(userRef);

        const userData = userSnap.data();

        const response = await fetch(
    "https://novapay-backend-popa.onrender.com/generate-account",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: userData.fullName,
                    email: userData.email
                })
            }
        );

        const result = await response.json();

        const account =
            result.responseBody.accounts[0];

        await updateDoc(userRef, {

            reservedAccount: true,

            bankName: account.bankName,

            accountNumber: account.accountNumber,

            accountName: account.accountName

        });

        alert("Account Generated Successfully");

        location.reload();

    }

    catch (error) {

        console.error(error);

        alert("Unable to generate account.");

    }

});