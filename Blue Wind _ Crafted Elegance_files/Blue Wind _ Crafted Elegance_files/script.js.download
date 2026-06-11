document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("product-container");

  // 🔹 Static design data
  const designs = [
    { name: "Modern Sofa", category: "living", image: "https://picsum.photos/300?1" },
    { name: "Classic Chair", category: "furniture", image: "https://picsum.photos/300?2" },
    { name: "Wooden Table", category: "table", image: "https://picsum.photos/300?3" },
    { name: "Luxury Bed", category: "bedroom", image: "https://picsum.photos/300?4" }
  ];

  // 🔹 Render designs
  function renderProducts(filter = "") {
    if (!container) return;

    const filtered = filter
      ? designs.filter(d => d.category === filter)
      : designs;

    if (filtered.length === 0) {
      container.innerHTML = "<p>No designs found.</p>";
      return;
    }

    container.innerHTML = "";

    filtered.forEach((design) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-img">
          <img src="${design.image}" alt="${design.name}">
        </div>

        <div class="card-content">
          <h3>${design.name}</h3>
          <p class="category">${design.category}</p>
          <button class="book-btn">Book Appointment</button>
        </div>
      `;

      // ✅ Redirect to booking page
      const button = card.querySelector(".book-btn");
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // prevents accidental card click issues
        window.location.href = `booking.html?design=${encodeURIComponent(design.name)}`;
      });

      container.appendChild(card);
    });
  }

  // 🔹 Filter buttons
  const buttons = document.querySelectorAll(".filter-pill");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      buttons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      const category = button.getAttribute("data-category");

      renderProducts(category);
    });
  });

  // 🔹 Initial load
  renderProducts();
});