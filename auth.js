import { auth, db } from "./firebase.js";
import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const fullName = document.getElementById("fullName");
const phoneNumber = document.getElementById("phoneNumber");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const createAccountBtn = document.getElementById("createAccountBtn"); 
createAccountBtn.addEventListener("click", async () => {

    if (
        fullName.value.trim() === "" ||
        phoneNumber.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value === "" ||
        confirmPassword.value === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    } 
        try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        const user = userCredential.user; 
                localStorage.setItem("novapayUser", JSON.stringify({
            uid: user.uid,
            fullName: fullName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            balance: 0
        })); 
        await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    fullName: fullName.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    email: email.value.trim(),

    walletBalance: 0,
    reservedAccount: null,
    accountName: "",
    accountNumber: "",
    bankName: "",

    transactions: [],

    createdAt: new Date().toISOString()
});
                alert("Account created successfully!");

        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }

});