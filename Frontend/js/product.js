// document.addEventListener("DOMContentLoaded", () => {
//   // 📌 Elements
//   const container = document.getElementById("product-details");

//   // 🔙 Back button (if exists)
//   const backBtn = document.getElementById("backBtn");
//   if (backBtn) {
//     backBtn.addEventListener("click", () => {
//       window.location.href = "index.html";
//     });
//   }

//   // 📌 Get ID from URL
//   const params = new URLSearchParams(window.location.search);
//   const productId = params.get("id");

//   console.log("Product ID:", productId); // ✅ debug

//   // ❌ If no ID
//   if (!productId) {
//     showError("Invalid product ID");
//     return;
//   }

//   // 🚀 Fetch product
//   fetchProduct(productId);

//   // =========================
//   // 🔄 Fetch Function
//   // =========================
//   async function fetchProduct(id) {
//     showLoading();

//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${id}`);

//       if (!res.ok) {
//         throw new Error("Product not found");
//       }

//       const product = await res.json();
//       showProduct(product);
//     } catch (error) {
//       console.error(error);
//       showError("Unable to load product. Please try again.");
//     }
//   }

//   // =========================
//   // 🟡 Loading State
//   // =========================
//   function showLoading() {
//     container.innerHTML = `<p style="text-align:center;">Loading product...</p>`;
//   }

//   // =========================
//   // ❌ Error State
//   // =========================
//   function showError(message) {
//     container.innerHTML = `
//       <p style="text-align:center; color:red;">
//         ${message}
//       </p>
//     `;
//   }

//   // =========================
//   // ✅ Success State
//   // =========================
//   function showProduct(product) {
//     container.innerHTML = `
//       <div class="product-card">
//         <img 
//             src="${product.image ? product.image : `https://picsum.photos/400/400?random=${product.id}`}" 
//             alt="${product.name}" 
//             class="product-image"
//             onerror="this.src='https://picsum.photos/400/400?random=${product.id}'"
//         />

//         <div class="product-info">
//           <h2>${product.name}</h2>
//           <p><strong>Category:</strong> ${product.category}</p>
//           <h3>₹${product.price}</h3>
//           <p>${product.description}</p>

//           <div class="booking-section">
//             <h3>Custom Tailoring Service</h3>
//             <p>
//               Get this design stitched perfectly to your size.
//               Our expert will visit your location, take measurements,
//               and deliver a ready-to-wear outfit.
//             </p>

//             <!-- ✅ FIXED BUTTON -->
//             <button id="bookBtn">Book Appointment</button>

//             <p style="font-size: 13px; color: gray;">
//               ✔ Home Visit | ✔ Perfect Fit | ✔ Expert Tailors
//             </p>
//           </div>
//         </div>
//       </div>
//     `;

//     // 📅 Booking button logic (✅ FIXED)
//     const bookBtn = document.getElementById("bookBtn");

//     if (bookBtn) {
//       bookBtn.addEventListener("click", () => {
//         console.log("Redirecting to booking with ID:", product.id);
//         window.location.href = `booking.html?id=${product.id}`;
//       });
//     }
//   }
// });