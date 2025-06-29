document.getElementById("addItemForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!title || !price || !imageFile) {
    alert("Please fill all fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageDataUrl = reader.result;

    const newProduct = {
      title,
      price,
      image: imageDataUrl,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("products")) || [];
    existing.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existing));

    alert("Product added!");
    document.getElementById("addItemForm").reset();
    loadProducts(); // Refresh products display
  };
  reader.readAsDataURL(imageFile);
});
