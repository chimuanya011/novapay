import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAt7YnxQ5787wKxlui-sUniR0PP_LZXYxw",
  authDomain: "novapay-c88fa.firebaseapp.com",
  projectId: "novapay-c88fa",
  storageBucket: "novapay-c88fa.firebasestorage.app",
  messagingSenderId: "194275506659",
  appId: "1:194275506659:web:fcaa1b1e19c559443cc8d6"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };