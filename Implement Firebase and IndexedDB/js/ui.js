import { saveMealPlanToIndexedDB, getMealPlanFromIndexedDB, saveMealPlanToFirebase } from './firebaseDB.js';

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js")
    .then((req) => console.log("Service Worker Registered!", req))
    .catch((err) => console.log("Service Worker registration failed", err));
}

// Call loadMealPlan when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // load meal plan from firebase and display it
  loadMealPlan();

  // Check storage usage
  checkStorageUsage();

  // Request persistent storage
  requestPersistentStorage();
});

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
      await saveMealPlanToFirebase(mealPlan);
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

// Load meal plan function
const loadMealPlan = async () => {
  let mealPlan;

  if (navigator.onLine) {
    // If online, load from Firebase
    mealPlan = await getMealPlanFromIndexedDB();
  } else {
    // If offline, load from IndexedDB
    mealPlan = await getMealPlanFromIndexedDB();
  }

  const mealPlannerMsg = document.getElementById("meal-planner-msg");
  
  if (mealPlan) {
    // Filter out the 'id' key when creating the list
    const mealEntries = Object.entries(mealPlan).filter(([key, value]) => key !== "id");
    const mealPlanHTML = mealEntries
      .map(([day, meal]) => `<p>${day.charAt(0).toUpperCase() + day.slice(1)}: ${meal}</p>`)
      .join('');
    
    mealPlannerMsg.innerHTML = mealPlanHTML || "<p>No meal plan available.</p>";
  } else {
    mealPlannerMsg.innerHTML = "<p>No meal plan available.</p>";
  }
};

// Function to check storage usage
async function checkStorageUsage() {
  if (navigator.storage && navigator.storage.estimate) {
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
  }
}

// Function to request persistent storage
async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
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
  }
}

// Event listener for save button
const saveButton = document.getElementById("save-plan");
saveButton.addEventListener("click", savePlan);