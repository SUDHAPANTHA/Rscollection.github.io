import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAdevSP8dqZ6GZMFo5SU61hl51y4w9M20",
  authDomain: "clothy1-7ef01.firebaseapp.com",
  databaseURL: "https://clothy1-7ef01-default-rtdb.firebaseio.com",
  projectId: "clothy1-7ef01",
  storageBucket: "clothy1-7ef01.firebasestorage.app",
  messagingSenderId: "705095173001",
  appId: "1:705095173001:web:f8ef4798a3645e5dc19758",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById("addItemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!title || !price || !imageFile) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Save product data to Firestore
    await addDoc(collection(db, "products"), {
      title,
      price,
      image: imageUrl,
      createdAt: serverTimestamp(),
    });

    alert("Product added successfully!");
    document.getElementById("addItemForm").reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to add product: " + error.message);
  }
});
