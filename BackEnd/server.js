const express = require("express");
const cors = require("cors");
const Booking = require("./models/Booking");

require("dotenv").config(); // FIRST

const connectDB = require("./config/db");

connectDB(); // THEN connect

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROOT ROUTE =================
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= BOOKINGS =================

// In-memory storage (temporary)
// let bookings = [];
// let bookingId = 1;

// ✅ CREATE BOOKING
app.post("/api/bookings", async (req, res) => {
  try {
    const { design, name, phone, address, date, notes } = req.body;

    // Basic validation
    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and address are required",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone must be 10 digits",
      });
    }

    // 🔹 SAVE TO DATABASE
    const booking = await Booking.create({
      design,
      name,
      phone,
      address,
      date,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Booking saved",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ DEBUG LOG (VERY IMPORTANT)
    console.log("Updating ID:", req.params.id);
    console.log("New Status:", status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error("ERROR:", err); // 🔴 IMPORTANT
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

// ================= OPTIONAL (VERY USEFUL) =================
// Get all bookings (for admin/testing)

// ================= SERVER START =================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
