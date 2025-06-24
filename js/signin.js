import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCAdevSP8dqZ6GZMFo5SU61hl51y4w9M20",
  authDomain: "clothy1-7ef01.firebaseapp.com",
  projectId: "clothy1-7ef01",
  storageBucket: "clothy1-7ef01.appspot.com",
  messagingSenderId: "705095173001",
  appId: "1:705095173001:web:f8ef4798a3645e5dc19758",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Email/Password Login
document.getElementById("login-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = "";

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      Toastify({
        text: "Login successful!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4ADE80",
      }).showToast();
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
});

// Google Login
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(() => {
      Toastify({
        text: "Logged in with Google!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4ADE80",
      }).showToast();
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    })
    .catch((error) => {
      Toastify({
        text: error.message,
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F87171",
      }).showToast();
    });
});

// Forgot Password
document
  .getElementById("forgot-password")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const email = prompt("Enter your registered email:");
    const errorMsg = document.getElementById("error-msg");
    errorMsg.textContent = "";

    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      Toastify({
        text: "Password reset email sent!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#60A5FA",
      }).showToast();
    } catch (error) {
      let message = error.message;
      switch (error.code) {
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        default:
          message = "Something went wrong. Try again.";
          break;
      }

      Toastify({
        text: message,
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F87171",
      }).showToast();
    }
  });
