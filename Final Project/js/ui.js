
import { 
  saveMealPlanToIndexedDB, 
  getMealPlanFromIndexedDB, 
  saveMealPlanToFirebase, 
  getMealPlanFromFirebase, 
  syncIndexedDBToFirebase, 
  setupSync
} from './firebaseDB.js';

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js")
    .then((registration) => console.log("Service Worker Registered!", registration))
    .catch((err) => console.log("Service Worker registration failed", err));
}

// Save meal plan function
const savePlan = async () => {
  try {
    // Get input values
    const mealPlan = {
      monday: document.getElementById("meal-monday").value,
      tuesday: document.getElementById("meal-tuesday").value,
      wednesday: document.getElementById("meal-wednesday").value,
      thursday: document.getElementById("meal-thursday").value,
      friday: document.getElementById("meal-friday").value,
      saturday: document.getElementById("meal-saturday").value,
      sunday: document.getElementById("meal-sunday").value
    };

    if (navigator.onLine) {
      // If online, save to Firebase
      await saveMealPlanToFirebase(mealPlan); // This function saves the meal plan directly under "mealPlans"
    } else {
      // If offline, save to IndexedDB
      await saveMealPlanToIndexedDB(mealPlan);
    }

    loadMealPlan(); // Reload meal plan after saving
    console.log("Meal plan saved successfully");
  } catch (error) {
    console.error("Error saving meal plan:", error);
  }
  
  checkStorageUsage();
};

// Function to load and display the meal plan
export const loadMealPlan = async () => {
  let mealPlan;

  if (navigator.onLine) {
    // If online, load from Firebase
    mealPlan = await getMealPlanFromFirebase();
  } else {
    // If offline, load from IndexedDB
    mealPlan = await getMealPlanFromIndexedDB();
  }

  const mealPlannerMsg = document.getElementById("meal-planner-msg");
  
  if (mealPlan) {
    const mealEntries = Object.entries(mealPlan).filter(([key, value]) => key !== "id");
    const mealPlanHTML = mealEntries
      .map(([day, meal]) => `<p>${capitalize(day)}: <span class="green-text">${meal}</span></p>`)
      .join('');

    mealPlannerMsg.innerHTML = mealPlanHTML || "<p>No meal plan available.</p>";
  } else {
    mealPlannerMsg.innerHTML = "<p>No meal plan available.</p>";
  }
};

// Helper function to capitalize the first letter
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Function to check storage usage
async function checkStorageUsage() {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const { usage, quota } = await navigator.storage.estimate();
      const usageInMB = (usage / (1024 * 1024)).toFixed(2); // Convert to MB
      const quotaInMB = (quota / (1024 * 1024)).toFixed(2); // Convert to MB

      console.log(`Storage used: ${usageInMB} MB of ${quotaInMB} MB`);

      // Update the UI with storage info
      const storageInfo = document.querySelector("#storage-info");
      if (storageInfo) {
        storageInfo.textContent = `Storage used: ${usageInMB} MB of ${quotaInMB} MB`;
      }

      // Warn the user if storage usage exceeds 80%
      if (usage / quota > 0.8) {
        const storageWarning = document.querySelector("#storage-warning");
        if (storageWarning) {
          storageWarning.textContent =
            "Warning: You are running low on storage space. Please delete old tasks to free up space.";
          storageWarning.style.display = "block";
        }
      } else {
        const storageWarning = document.querySelector("#storage-warning");
        if (storageWarning) {
          storageWarning.textContent = "";
          storageWarning.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error estimating storage:", error);
    }
  }
}

// Function to request persistent storage
async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    try {
      const isPersistent = await navigator.storage.persist();
      console.log(`Persistent storage granted: ${isPersistent}`);

      // Update the UI with a message
      const storageMessage = document.querySelector("#persistent-storage-info");
      if (storageMessage) {
        if (isPersistent) {
          storageMessage.textContent =
            "Persistent storage granted. Your data is safe!";
          storageMessage.classList.remove("red-text");
          storageMessage.classList.add("green-text");
        } else {
          storageMessage.textContent =
            "Persistent storage not granted. Data might be cleared under storage pressure.";
          storageMessage.classList.remove("green-text");
          storageMessage.classList.add("red-text");
        }
      }
    } catch (error) {
      console.error("Error requesting persistent storage:", error);
    }
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname.includes("planner.html")) {
    // Event listener for save button
    const saveButton = document.getElementById("save-plan");
    saveButton.addEventListener("click", savePlan);

    // Listen to 'userLoggedIn' event to load and sync data
document.addEventListener('userLoggedIn', async (e) => {
  const user = e.detail;
  if (user) {
    window.currentUser = user; 
    await loadMealPlan();
    await syncIndexedDBToFirebase(user.uid);
    setupSync(user.uid);
  }
});
}

  // Check storage usage
  checkStorageUsage();

  // Request persistent storage
  requestPersistentStorage();
});