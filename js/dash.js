import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "signin.html";
  }
});

async function loadDashboardData() {
  const ordersSnap = await getDocs(collection(db, "orders"));
  const productsSnap = await getDocs(collection(db, "products"));
  const customersSnap = await getDocs(collection(db, "customers"));

  document
    .querySelectorAll(".order-count")
    .forEach((el) => (el.textContent = ordersSnap.size));
  document
    .querySelectorAll(".product-count")
    .forEach((el) => (el.textContent = productsSnap.size));
  document
    .querySelectorAll(".customer-count")
    .forEach((el) => (el.textContent = customersSnap.size));
  document
    .querySelectorAll(".revenue-count")
    .forEach((el) => (el.textContent = "NPR " + ordersSnap.size * 1000));
}

loadDashboardData();

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        window.location.href = "signin.html";
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  });
}
