import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAdevSP8dqZ6GZMFo5SU61hl51y4w9M20",
  authDomain: "clothy1-7ef01.firebaseapp.com",
  projectId: "clothy1-7ef01",
  storageBucket: "clothy1-7ef01.appspot.com",
  messagingSenderId: "705095173001",
  appId: "1:705095173001:web:f8ef4798a3645e5dc19758",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector("form");
const statusMsg = document.createElement("p");
statusMsg.className = "mt-4 text-center font-semibold";
form.appendChild(statusMsg);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    statusMsg.textContent = "Please fill out all fields.";
    statusMsg.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });
    statusMsg.textContent = "Your message has been sent successfully!";
    statusMsg.style.color = "green";
    form.reset();
  } catch (error) {
    statusMsg.textContent = `Error: ${error.message}`;
    statusMsg.style.color = "red";
  }
});
