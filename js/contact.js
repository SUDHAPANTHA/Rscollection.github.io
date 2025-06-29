import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAdevSP8dqZ6GZMFo5SU61hl51y4w9M20",
  authDomain: "clothy1-7ef01.firebaseapp.com",
  databaseURL: "https://clothy1-7ef01-default-rtdb.firebaseio.com",
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
const messagesContainer = document.getElementById("messagesContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    statusMsg.textContent = "Please fill out all fields.";
    statusMsg.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      subject,
      message,
      createdAt: serverTimestamp(),
    });

    statusMsg.textContent = "Your message has been sent successfully!";
    statusMsg.style.color = "green";
    form.reset();
    loadMessages(); 
  } catch (error) {
    console.error("Firestore write error:", error);
    statusMsg.textContent = `Error: ${error.message}`;
    statusMsg.style.color = "red";
  }
});
async function loadMessages() {
  if (!messagesContainer) return;

  messagesContainer.innerHTML = "Loading...";

  try {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      messagesContainer.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    messagesContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const msgDiv = document.createElement("div");
      msgDiv.className = "p-4 mb-4 border rounded shadow bg-white";
      msgDiv.innerHTML = `
        <h3 class="font-bold text-lg">${data.subject}</h3>
        <p><strong>${data.name}</strong> &lt;${data.email}&gt;</p>
        <p class="mt-2">${data.message}</p>
        <p class="text-xs text-gray-500 mt-2">${
          data.createdAt?.toDate?.().toLocaleString() || "Pending..."
        }</p>
      `;
      messagesContainer.appendChild(msgDiv);
    });
  } catch (err) {
    messagesContainer.innerHTML = "<p>Error loading messages.</p>";
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", loadMessages);
