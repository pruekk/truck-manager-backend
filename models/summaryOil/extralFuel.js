const mongoose = require("mongoose");

const ExtralFuelSchema = new mongoose.Schema(
  {
    date: { type: Date },
    carId: { type: String, required: true },
    driverName: { type: String, required: true },

    source: { type: String, required: true },
    destination: { type: String, required: true },
    amount: { type: Number, required: true },

    notes: { type: String },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExtralFuel", ExtralFuelSchema);
