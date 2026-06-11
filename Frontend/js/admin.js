const API_URL = "http://luxary.onrender.com/api/bookings";
const password = prompt("Enter admin password:");

if (password !== "admin123") {
  alert("Access denied");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadBookings();
});

async function loadBookings() {
  const loadingText = document.getElementById("loadingText");
  const messageArea = document.getElementById("messageArea");
  const table = document.getElementById("bookingsTable");
  const tbody = document.getElementById("bookingTableBody");

  // 🔄 Reset UI state
  loadingText.hidden = false;
  messageArea.hidden = true;
  messageArea.textContent = "";
  messageArea.classList.remove("error");
  table.hidden = true;
  tbody.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    // ❗ Handle HTTP errors (404, 500, etc.)
    if (!response.ok) {
      throw new Error("Bad response from server");
    }

    const result = await response.json();

    // ✅ Handle both possible backend formats
    const bookings = result?.data || [];
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    loadingText.hidden = true;

    // 📭 Empty state
    if (!bookings || bookings.length === 0) {
      messageArea.textContent = "No bookings found";
      messageArea.hidden = false;
      return;
    }

    // 📊 Show table
    table.hidden = false;

    // 🔁 Populate table
    for (const booking of bookings) {
      const row = document.createElement("tr");

      addCell(row, booking.name);
      addCell(row, booking.phone);
      addCell(row, booking.address);
      addCell(row, formatDate(booking.date));
      addCell(row, booking.selectedDesign || booking.design || "—");
      addCell(row, booking.notes);
      addStatusCell(row, booking.status);
      addCell(row, formatDate(booking.createdAt));
      addActionCell(row, booking._id, booking.status);

      tbody.appendChild(row);
    }
  } catch (err) {
    console.error(err);

    loadingText.hidden = true;
    messageArea.textContent = "Failed to load bookings";
    messageArea.classList.add("error");
    messageArea.hidden = false;
  }
}

// 🧩 Helper: Create table cell
function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent =
    text === null || text === undefined || text === "" ? "—" : String(text);
  row.appendChild(cell);
}

// 📅 Helper: Format date nicely
function formatDate(value) {
  if (!value) return "—";

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) {
    return String(value);
  }

  return d.toLocaleString();
}

function addStatusCell(row, status) {
  const cell = document.createElement("td");

  const value = status || "pending";
  cell.textContent = value;

  if (value === "completed") {
    cell.style.color = "green";
    cell.style.fontWeight = "bold";
  } else if (value === "pending") {
    cell.style.color = "orange";
  } else if (value === "cancelled") {
    cell.style.color = "red";
  }

  row.appendChild(cell);
}

function addActionCell(row, id, status) {
  const cell = document.createElement("td");

  // ✅ Complete button
  if (status !== "completed") {
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";

    completeBtn.onclick = async () => {
      await updateStatus(id);
    };

    cell.appendChild(completeBtn);
  } else {
    const doneText = document.createElement("span");
    doneText.textContent = "Done";
    doneText.style.color = "green";
    doneText.style.fontWeight = "bold";
    cell.appendChild(doneText);
  }

  // ✅ DELETE BUTTON (always visible)
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "8px";

  deleteBtn.onclick = async () => {
    await deleteBooking(id);
  };

  cell.appendChild(deleteBtn);

  row.appendChild(cell);
}

async function updateStatus(id) {
  try {
    const res = await fetch(`http://luxary.onrender.com/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "completed",
      }),
    });

    if (!res.ok) {
      throw new Error("Update failed");
    }

    // 🔄 Reload updated data
    loadBookings();
  } catch (err) {
    console.error(err);
    alert("Failed to update status");
  }
}

async function deleteBooking(id) {
  try {
    // ⚠️ Confirmation popup
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?",
    );

    if (!confirmDelete) return;

    const res = await fetch(`http://luxary.onrender.com/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    // 🔄 Reload table
    loadBookings();
  } catch (err) {
    console.error(err);
    alert("Failed to delete booking");
  }
}
