# Recipe & Meal Planner PWA  

## Overview  
The Recipe & Meal Planner is a Progressive Web Application (PWA) designed to help users organize recipes, plan weekly meals, and create grocery lists. It features a responsive design built with the Materialize CSS framework, ensuring a seamless user experience on both desktop and mobile devices.  

### Features  
1. **Home Page (index.html):** An introduction to the app with navigation to the Recipes and Planner pages.  
2. **Recipes Page (recipe.html):** A collection of recipes where users can explore different meal options.  
3. **Meal Planner Page (planner.html):** An interface for users to plan meals for the week and generate grocery lists.
4. **Log-in/Register Page (auth.html):** The first page users will see as soon as they open the project. Users can register and log-in to access the database. 

## Prototype Navigation  
The app's prototype allows users to navigate through pages via the navigation bar or home page cards. All elements are responsive, adapting to different screen sizes. Buttons and forms are present but not fully functional in the prototype stage.  

## Technologies Used  
* **HTML5**  
* **CSS3 (Materialize Framework)**  
* **JavaScript**  

---

# PWA Features  

## Service Worker  
The service worker enhances the app’s performance and offline capabilities:  

* **Installation & Activation:** Caches essential assets (HTML, CSS, and JS files) for quick loading on repeat visits.  
* **Fetch Event:** Handles requests by serving cached content first, improving speed and reliability.  
* **Cache Storage:** Stores static assets for offline functionality, ensuring a smooth user experience even without an internet connection.  

## Caching Strategy  
The app uses a hybrid caching strategy for optimal performance:  

* **Cache-First:** Serves assets from the cache when available, falling back to the network only when necessary.  
* **Dynamic Caching:** Stores new user-added data on the fly to maintain offline access.  

## Manifest File  
The `manifest.json` file enables the PWA to function like a native app:  
* **App Name & Icons:** Displays the app’s name and appropriate icons across devices.  
* **Standalone Mode:** Removes browser UI for a native-like appearance.  
* **Custom Theme & Background Colors:** Aligns with the app’s branding for a cohesive design.  

---

# Firebase & IndexedDB Integration  

## Data Storage  
The app seamlessly integrates **Firebase** for online storage and **IndexedDB** for offline storage:  

* **Read:** Data retrieval works from Firebase (online) or IndexedDB (offline) depending on network status.  
* **Update:** Changes to meal plans are saved to Firebase or IndexedDB based on the user’s connectivity.  

## Synchronization Process  
* **Offline Mode:** User data is stored in IndexedDB when offline, ensuring it is not lost.  
* **Online Mode:** On reconnection, data from IndexedDB is synced to Firebase automatically.  
* **Conflict Handling:** Unique IDs prevent data duplication during syncing.  

## Notifications  
Users are notified when offline data is synced with Firebase, keeping them informed of updates.  

---

# Testing & Validation  

## Functional Testing  
The app has been tested for:  
* **Online/Offline CRUD Operations:** Ensuring smooth data handling in both modes.  
* **Synchronization:** Verifying that offline data syncs correctly with Firebase.  
* **Cross-Device Compatibility:** Testing on various devices and browsers for consistent functionality.  
* **Data Persistence:** Confirming data remains intact across sessions and online/offline transitions.  

---

# How to Use  

1. **Open the App:** Access the PWA through your browser.  
2. **Install:** Use the install prompt to add the app to your device's home screen.  
3. **Navigate:** Use the navigation bar to explore the Home, Recipes, and Planner pages.  
4. **Plan Meals:** Use the Planner page to organize your weekly meal plans and generate grocery lists.  
5. **Go Offline:** Continue using the app without internet. Your data will sync when the connection is restored.  

---

# Future Enhancements  

* Add support for user accounts and multiple family members.  
* Implement notifications for reminders and new recipe suggestions.  
* Improve the UI with additional themes and customization options.  
