import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDL7Ch31va8gObYsoS4kEsS4FfSsymc8x8",
    authDomain: "recipe-and-meal-planner.firebaseapp.com",
    projectId: "recipe-and-meal-planner",
    storageBucket: "recipe-and-meal-planner.firebasestorage.app",
    messagingSenderId: "146639551542",
    appId: "1:146639551542:web:f569ea973b25eac5542c97",
    measurementId: "G-8RM950D51D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };