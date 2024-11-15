// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDL7Ch31va8gObYsoS4kEsS4FfSsymc8x8",
  authDomain: "recipe-and-meal-planner.firebaseapp.com",
  projectId: "recipe-and-meal-planner",
  storageBucket: "recipe-and-meal-planner.firebasestorage.app",
  messagingSenderId: "146639551542",
  appId: "1:146639551542:web:f569ea973b25eac5542c97",
  measurementId: "G-8RM950D51D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save to Firebase (online)
export const saveMealPlanToFirebase = async (mealPlan) => {
  try {
    const mealPlanRef = doc(db, "mealPlans", "currentPlan");
    await setDoc(mealPlanRef, mealPlan);
    console.log("Meal Plan saved to Firebase!");
  } catch (e) {
    console.error("Error saving meal plan to Firebase: ", e);
  }
};

// Sync IndexedDB data to Firebase
export const syncIndexedDBToFirebase = async () => {
  const mealPlan = await getMealPlanFromIndexedDB();
  if (mealPlan) {
    await saveMealPlanToFirebase(mealPlan);
    console.log("Meal Plan synchronized to Firebase!");
  }
};

// IndexedDB Functions
const indexedDBName = "mealPlannerDB";
const mealPlanStoreName = "mealPlans";

// Open IndexedDB
const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(indexedDBName, 1);
    request.onerror = (e) => reject(e);
    request.onsuccess = (e) => resolve(e.target.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(mealPlanStoreName)) {
        db.createObjectStore(mealPlanStoreName, { keyPath: "id" });
      }
    };
  });
};

// Save to IndexedDB (offline)
export const saveMealPlanToIndexedDB = async (mealPlan) => {
  const db = await openIndexedDB();
  const transaction = db.transaction(mealPlanStoreName, "readwrite");
  const store = transaction.objectStore(mealPlanStoreName);
  const request = store.put({ ...mealPlan, id: "currentPlan" });  // Ensure unique ID for syncing

  request.onsuccess = () => console.log("Meal Plan saved to IndexedDB");
  request.onerror = (e) => console.error("Error saving meal plan to IndexedDB:", e);
};

// Get from IndexedDB
export const getMealPlanFromIndexedDB = async () => {
  const db = await openIndexedDB();
  const transaction = db.transaction(mealPlanStoreName, "readonly");
  const store = transaction.objectStore(mealPlanStoreName);
  const request = store.get("currentPlan");

  return new Promise((resolve, reject) => {
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e);
  });
};

// Check online/offline status and switch storage
const handleOnlineOffline = () => {
  if (navigator.onLine) {
    console.log("Online - Syncing with Firebase");
    syncIndexedDBToFirebase();
  } else {
    console.log("Offline - Using IndexedDB");
  }
};

window.addEventListener("online", handleOnlineOffline);
window.addEventListener("offline", handleOnlineOffline);
