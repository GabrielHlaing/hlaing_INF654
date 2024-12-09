// Import necessary Firebase modules and configurations
import { auth, db } from "./firebaseConfig.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const signInForm = document.getElementById("sign-in-form");
  const signUpForm = document.getElementById("sign-up-form");
  const showSignUp = document.getElementById("show-signup");
  const showSignIn = document.getElementById("show-signin");
  const signInBtn = document.getElementById("sign-in-btn");
  const signUpBtn = document.getElementById("sign-up-btn");

  // Toggle visibility between Sign-Up and Sign-In forms
  showSignIn.addEventListener("click", () => {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  });

  showSignUp.addEventListener("click", () => {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
  });

  // Sign-Up logic
  signUpBtn.addEventListener("click", async () => {
    const name = document.getElementById("sign-up-name").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;

    try {
      // Create user in Firebase Authentication
      const authCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with display name
      await updateProfile(authCredential.user, { displayName: name });

      // Add user data to Firestore
      const userRef = doc(db, "users", authCredential.user.uid);
      await setDoc(userRef, { email: email, name: name });

      // Display success message and redirect
      M.toast({ html: "Sign-up successful!" });
      window.location.href = "/pages/auth.html"; // Redirect to sign in page
    } catch (error) {
      console.error("Sign-up error: ", error);
      M.toast({ html: error.message });
    }
  });

  // Sign-In logic
  signInBtn.addEventListener("click", async () => {
    const email = document.getElementById("sign-in-email").value;
    const password = document.getElementById("sign-in-password").value;

    try {
      // Authenticate user in Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Display success message and redirect
      M.toast({ html: "Sign-in successful!" });
      window.location.href = "/"; // Redirect to home or dashboard page
    } catch (error) {
      console.error("Sign-in error: ", error);
      M.toast({ html: error.message });
    }
  });
});
