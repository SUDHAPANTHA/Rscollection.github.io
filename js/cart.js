let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItemsContainer || !cartTotal) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex items-center gap-4";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" class="w-16 h-16 object-cover rounded" />
      <div class="flex-grow">
        <h3 class="font-semibold text-gray-900">${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button data-index="${index}" class="remove-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      cart.splice(idx, 1);
      saveCart();
      renderCart();
    });
  });
}

function addToCart(product) {
  const index = cart.findIndex((item) => item.name === product.name);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart();
  renderCart();
  alert(`${product.name} added to cart!`);
}

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("div.bg-white");
    if (!card) return;

    const name = card.querySelector("h3").textContent.trim();

    let priceElem = card.querySelector(".text-2xl, .text-xl");
    let priceText = priceElem ? priceElem.textContent : "$0";
    const price = parseFloat(priceText.replace("$", ""));

    const image = card.querySelector("img").getAttribute("src");

    addToCart({ name, price, image });
  });
});

document.getElementById("clear-cart-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    saveCart();
    renderCart();
  }
});

renderCart();
