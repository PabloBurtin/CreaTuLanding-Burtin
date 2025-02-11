
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "barricasdelparana-c58f9.firebaseapp.com",
  projectId: "barricasdelparana-c58f9",
  storageBucket: "barricasdelparana-c58f9.firebasestorage.app",
  messagingSenderId: "388259200483",
  appId: "1:388259200483:web:1f6b4007d3dc2971fbf4d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)




