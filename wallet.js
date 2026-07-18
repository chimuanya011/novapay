import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
// ======================================
// LOAD USER WALLET
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {

            alert("Wallet not found.");

            return;

        }

        const userData = userSnap.data();

        const balanceElement =
            document.getElementById("walletBalance");

        if (balanceElement) {

            balanceElement.textContent =
                "₦" + Number(userData.walletBalance).toLocaleString();

        }

    } catch (error) {

        console.error(error);

        alert("Failed to load wallet.");

    }

});
// ======================================
// UPDATE WALLET
// ======================================

export async function updateWallet(userId, newBalance) {

    try {

        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {

            walletBalance: newBalance

        });

    } catch (error) {

        console.error(error);

    }

}