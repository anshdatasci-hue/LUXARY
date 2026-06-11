document.addEventListener("DOMContentLoaded", () => {
  console.log("Booking JS loaded");

  const form = document.getElementById("bookingForm");
  const status = document.getElementById("status");

  console.log("Form:", form);
  console.log("Status:", status);

  // 📌 Get design from URL (OPTIONAL)
  const params = new URLSearchParams(window.location.search);
  const designFromURL = params.get("design");

  // Show selected design (if exists)
  const designInfo = document.getElementById("product-info");
  if (designInfo) {
    designInfo.textContent = designFromURL
      ? `Selected Design: ${designFromURL}`
      : "Custom Design Booking";
  }

  // 📌 Form Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";

    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";

    console.log("🚀 Submit triggered");

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value.trim();
    const designId = document.getElementById("designId").value;

    console.log({ name, phone, address, date, notes, designId });

    // ✅ Validation
    if (!name || !phone || !address || !date || !designId) {
      status.style.color = "red";
      status.textContent = "Please fill all required fields";
      submitBtn.disabled = false; // ✅ ADD
      submitBtn.textContent = "Submit booking"; // ✅ ADD
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      status.style.color = "red";
      status.textContent = "Enter valid 10-digit phone number";
      submitBtn.disabled = false; // ✅ ADD
      submitBtn.textContent = "Submit booking"; // ✅ ADD
      return;
    }

    // ✅ Final booking object
    const bookingData = {
      design: "Custom", // final business outcome
      selectedDesign: designId, // user choice (important)
      name,
      phone,
      address,
      date,
      notes,
    };

    console.log("📡 Sending request...", bookingData);

    try {
      const response = await fetch("https://luxary.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      console.log("✅ Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      // ✅ Success UI
      status.style.color = "green";
      status.textContent = "✅ Appointment booked successfully!";
      // scroll to message
      status.scrollIntoView({ behavior: "smooth", block: "center" });

      form.reset();
      // restore button
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit booking";
    } catch (error) {
      console.error("❌ Error:", error);

      status.style.color = "red";
      status.textContent = error.message || "Something went wrong";

      // restore button
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit booking";
    }
  });
});
