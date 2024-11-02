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
