// Import necessary Firebase functions
import { currentUser } from "./auth.js";
import { db } from "./firebaseConfig.js";
import { doc, getDoc, setDoc, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// IndexedDB Constants
const indexedDBName = "mealPlannerDB";
const mealPlanStoreName = "mealPlans";

// Open IndexedDB
export const openIndexedDB = () => {
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
  try{
    if (!currentUser) {
    console.error("User ID is required to save meal plan.");
    return;
  }
    const userId = currentUser.uid;
    const dbInstance = await openIndexedDB();
    const transaction = dbInstance.transaction(mealPlanStoreName, "readwrite");
    const store = transaction.objectStore(mealPlanStoreName);
    await store.put({ ...mealPlan, id: userId }); // Use userId as the key
    console.log("Meal Plan saved to IndexedDB");
  } catch (error) {
    console.error("Error saving meal plan to IndexedDB:", error);
  }
};

// Get from IndexedDB
export const getMealPlanFromIndexedDB = async () => {
  try {
    const userId = currentUser.uid;
    const dbInstance = await openIndexedDB();
    const transaction = dbInstance.transaction(mealPlanStoreName, "readonly");
    const store = transaction.objectStore(mealPlanStoreName);
    const request = store.get(userId);

    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e);
    });
  } catch (error) {
    console.error("Error fetching meal plan from IndexedDB:", error);
    return null;
  }
};

// Save to Firebase (online)
export const saveMealPlanToFirebase = async (mealPlan) => {
 try {
  if (!currentUser) {
    throw new Error("User is not authenticated.");
  }
  
    const userId = currentUser.uid; // Get current user's UID
    const userRef = doc(db, "users", userId); // Reference to the user's document

    // Update or create the user's document with email, name, and mealPlans
    await setDoc(userRef, {
      email: currentUser.email, 
      name: currentUser.displayName || "User Name", // Fallback to "User Name"
      mealPlans: mealPlan, // Display the updated meal plan
    }); 
    console.log("User data and meal plan saved to Firebase");
  } catch (error) {
    console.error("Error saving user data and meal plan to Firebase:", error);
  }
};


// Get Meal Plan from Firebase (online)
export const getMealPlanFromFirebase = async () => {
  try {
    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    const userId = currentUser.uid; 
    const userRef = doc(db, "users", userId); 

    const docSnap = await getDoc(userRef); 

    if (docSnap.exists()) {
      const data = docSnap.data();
      const mealPlans = data.mealPlans; // Extract mealPlans field
      return mealPlans; // Return mealPlans map
    } else {
      console.log("No meal plan found for this user.");
      return null;
    }
  } catch (error) {
    console.error("Error getting meal plan from Firebase:", error);
    return null;
  }
};


export const syncIndexedDBToFirebase = async () => {
  try {
    const mealPlan = await getMealPlanFromIndexedDB();
    if (!mealPlan) {
      console.log("No offline meal plan found to sync.");
      return; // Exit if no data to sync
    }
    
    if (!currentUser || !currentUser.uid) {
      console.error("User is not authenticated, cannot sync to Firebase.");
      return;
    }

    console.log("Syncing offline data to Firebase:");
    await saveMealPlanToFirebase(mealPlan);
    console.log("Meal Plan synchronized to Firebase successfully!");
  } catch (error) {
    console.error("Error syncing IndexedDB to Firebase:", error);
  }
};


// Setup synchronization when online
export const setupSync = () => {
  if (navigator.onLine) {
    console.log("Online - Syncing with Firebase");
    syncIndexedDBToFirebase();
  } else {
    console.log("Offline - Using IndexedDB");
  }
};


window.addEventListener("online", setupSync);
window.addEventListener("offline", setupSync);
