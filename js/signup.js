import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCAdevSP8dqZ6GZMFo5SU61hl51y4w9M20",
  authDomain: "clothy1-7ef01.firebaseapp.com",
  projectId: "clothy1-7ef01",
  storageBucket: "clothy1-7ef01.firebasestorage.app",
  messagingSenderId: "705095173001",
  appId: "1:705095173001:web:f8ef4798a3645e5dc19758",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  const fullname = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;
  const errorMsg = document.getElementById("error-msg");

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match!";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return updateProfile(userCredential.user, {
        displayName: fullname,
      });
    })
    .then(() => {
      alert("Registration successful!");
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
});
document.getElementById("google-log").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(() => {
      Toastify({
        text: "Logged in with Google!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4ADE80",
      }).showToast();
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
