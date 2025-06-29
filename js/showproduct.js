function loadProducts() {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  storedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  storedProducts.forEach((product) => {
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
}

// Call on initial load
document.addEventListener("DOMContentLoaded", loadProducts);
