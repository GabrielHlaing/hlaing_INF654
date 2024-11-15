# Recipe & Meal Planner PWA

# Overview:
This Recipe & Meal Planner is a Progressive Web Application (PWA) prototype designed to help users save their favorite recipes, plan meals for the week, and generate grocery lists. The project showcases a responsive design built with the Materialize CSS framework, ensuring a user-friendly experience on both desktop and mobile devices.
The application consists of three primary pages:

1. Home Page (index.html): Introduction to the app, with navigation to the Recipes and Planner sections.
2. Recipes Page (recipe.html): A collection of recipes where users can explore and save their favorite meals.
3. Meal Planner Page (planner.html): A simple interface for users to plan meals for the week and prepare grocery lists.

## Viewing the Prototype:
The PWA prototype can be navigated using the buttons on the navigation bar or the cards on the Home page. 
The navigation bar, cards, and all other contents are responsive to the window size. The buttons are clickable but lack functionality because JS has still not been implemented. 

## Technologies Used:
* HTML5
* CSS3 (Materialize Framework)
* JavaScript (for future interactivity and PWA functionality)

# PWA Specifics

## Service Worker
The service worker is designed to manage caching and enable offline functionality, providing a smoother experience even when the network is unstable. Here’s an outline of how the service worker operates:

* Installation & Activation: On the first visit, the service worker installs and activates, caching essential assets such as HTML, CSS, and JavaScript files to ensure quick loading on repeat visits.
* Fetch Event: The service worker intercepts network requests, checking the cache first to serve a cached version if available, reducing reliance on the network and improving performance.
* Cache Storage: The cache stores static assets needed for offline access, allowing the PWA to continue functioning even if the user loses connectivity.

## Caching Strategy
The app uses a Cache-First strategy for static assets:

* Cache-First: Ensures that users receive a faster experience by loading files from the cache first if they’re available, only reaching out to the network for updates if necessary.
* Dynamic Caching: For additional content, such as user-added recipes or dynamic data, the service worker employs dynamic caching, storing new data on the fly to enhance offline functionality.

## Manifest File
The manifest.json file defines essential metadata for the PWA, enabling it to be installed on a user's device like a native app. Key elements include:

* App Name & Short Name: The name of the PWA, which displays on the home screen and during installation prompts.
* Icons: A set of app icons in multiple resolutions for compatibility across devices.
Display Mode: Set to standalone, allowing the app to appear as a standalone app without a browser interface.
* Theme & Background Color: The theme color (#276AB3) and background color (#FFCC80) are chosen to align with the design and branding of the app.

# Firebase & IndexedDB Integration

## Data Storage
The application integrates Firebase for online data storage and IndexedDB for offline storage, enabling seamless CRUD operations:

* Create: Users can view recipes and save meal plans. Data is stored in Firebase when online and in IndexedDB when offline.
* Read: The app fetches saved recipes and meal plans from Firebase or IndexedDB based on the current online/offline status.
* Update: Users can modify existing meal plans, with changes saved in Firebase (online) or IndexedDB (offline).

## Synchronization Process
The app detects online/offline status and switches between Firebase and IndexedDB accordingly:

* Offline Mode: When offline, user interactions store data in IndexedDB. This ensures data is preserved even without network connectivity.
* Online Mode: When connectivity is restored, the app automatically syncs offline data from IndexedDB to Firebase. It checks for new entries and updates, preserving consistency across devices.
* Conflict Handling: Unique identifiers (IDs) are maintained across both Firebase and IndexedDB to prevent conflicts during synchronization.

## Notifications
The app provides notifications to inform users when offline data has been synced with Firebase, ensuring they are aware of data updates across sessions.

# Testing & Validation

## Functional Testing
The PWA has been thoroughly tested for:

* Online/Offline CRUD Operations: Verifying that adding, updating, deleting, and viewing data works seamlessly both online and offline.
* Synchronization: Ensuring data stored offline syncs correctly with Firebase when the app goes back online.
* Cross-Device Compatibility: Confirming the app functions correctly on different devices and browsers.
* Data Persistence: Testing for consistent data storage across sessions and switching between online and offline modes.

# How to Use

1. Open the App: Access the PWA through your browser.
2.  Install: Click the install prompt to add the PWA to your device's home screen.
3. Navigate: Use the navigation bar to access the Home, Recipes, and Planner pages.
4. Add Recipes/Meals: Enter your favorite recipes and meal plans through the provided forms.
5. Plan Meals: Use the Planner page to organize your weekly meal plan and generate a grocery list.
6. Offline Mode: Continue using the app without internet connectivity. Your data will be saved locally and synced once you're back online.