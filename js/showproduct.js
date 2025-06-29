import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
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

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";

  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const product = doc.data();

      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
        <p class="text-rose-500 font-semibold">NPR ${product.price}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
});
