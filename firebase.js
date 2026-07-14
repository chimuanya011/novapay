// Firebase App
import { initializeApp } from "firebase/app";

// Firebase Authentication
import {
  getAuth
} from "firebase/auth";

// Firestore Database
import {
  getFirestore
} from "firebase/firestore"; // NovaPay Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt7YnxQ5787wKxlui-sUniR0PP_LZXYxw",
  authDomain: "novapay-c88fa.firebaseapp.com",
  projectId: "novapay-c88fa",
  storageBucket: "novapay-c88fa.firebasestorage.app",
  messagingSenderId: "194275506659",
  appId: "1:194275506659:web:fcaa1b1e19c559443cc8d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export Services
export { auth, db };