// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDnIVHxB7hOY5zDXA-8KHi5s1LKkvc5e-8",
  authDomain: "gestion-projets-d1dd9.firebaseapp.com",
  projectId: "gestion-projets-d1dd9",
  storageBucket: "gestion-projets-d1dd9.firebasestorage.app",
  messagingSenderId: "693796387163",
  appId: "1:693796387163:web:20879924eb5e46fc69427e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Initialize and export Firestore