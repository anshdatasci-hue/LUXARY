const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    design: {
      type: String,
      default: "Custom",
    },
    selectedDesign: String,
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
