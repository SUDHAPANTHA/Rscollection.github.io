document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#newarrivals .grid");

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-6 rounded-lg shadow-md flex flex-col h-full transform transition duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 animate-float";

    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.title}"
        class="w-full h-48 object-cover rounded mb-4"
      />
      <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
      <p class="text-gray-600">NPR ${product.price}</p>
    `;

    container.appendChild(card);
  });
});
