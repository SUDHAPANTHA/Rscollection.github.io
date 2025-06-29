function loadProducts() {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  storedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  storedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden";

    card.innerHTML = `
      <div class="relative overflow-hidden rounded-t-lg">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div class="p-6">
        <h3 class="font-semibold text-gray-900 mb-2 text-lg group-hover:text-rose-500 transition">
          ${product.title}
        </h3>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xl font-bold text-rose-500">NPR ${product.price}</span>
          <span class="text-gray-400 text-sm">Limited Stock</span>
        </div>
        <button
          class="add-to-cart w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    `;

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(product);
    });

    container.appendChild(card);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.title === product.title);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function showCart() {
  const cartSection = document.getElementById("cartSummary");
  const cartList = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartSection.classList.add("hidden");
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "flex gap-4 items-center border-b pb-4";

    li.innerHTML = `
      <img src="${item.image}" alt="${
      item.title
    }" class="w-16 h-16 rounded object-cover border" />
      <div class="flex-1">
        <h4 class="text-gray-800 font-semibold text-sm">${item.title}</h4>
        <p class="text-gray-500 text-sm">NPR ${item.price} × ${
      item.quantity
    }</p>
        <p class="text-rose-500 font-bold text-sm mt-1">Total: NPR ${
          item.price * item.quantity
        }</p>
      </div>
      <button data-index="${index}" class="remove-item text-sm text-red-500 hover:underline">Remove</button>
    `;

    cartList.appendChild(li);
  });

  cartSection.classList.remove("hidden");

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeCartItem(e.target.getAttribute("data-index"));
    });
  });
}

function removeCartItem(idx) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  showCart();
});
