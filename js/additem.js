document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addItemForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const imageInput = document.getElementById("image");
    const imageFile = imageInput.files[0];

    if (!title || !price || !imageFile) {
      alert("Please fill in all fields.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const imageDataUrl = reader.result;

      const product = {
        title,
        price,
        image: imageDataUrl,
      };

      const existingItems = JSON.parse(localStorage.getItem("products")) || [];
      existingItems.push(product);
      localStorage.setItem("products", JSON.stringify(existingItems));

      alert("Product added successfully!");
      form.reset();
    };
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("addItemForm");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const price = document.getElementById("price").value;
        const imageInput = document.getElementById("image");
        const imageFile = imageInput.files[0];

        if (!title || !price || !imageFile) {
          alert("Please fill in all fields.");
          return;
        }

        const reader = new FileReader();
        reader.onload = async function () {
          const imageDataUrl = reader.result;

          const product = {
            title,
            price,
            image: imageDataUrl,
            createdAt: new Date(),
          };

          try {
            await addDoc(collection(window.db, "products"), product);
            alert("Product added to Firestore!");
            form.reset();
          } catch (err) {
            console.error("Error adding to Firestore:", err);
            alert("Failed to save to Firestore.");
          }
        };

        reader.readAsDataURL(imageFile);
      });
    });
    reader.readAsDataURL(imageFile);
  });
});
