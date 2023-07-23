const mongoose = require("mongoose");

const FuelSchema = new mongoose.Schema(
  {
    date: { type: Date },
    fuelId: { type: String },
    factoryId: { type: String, required: true },
    carId: { type: String, required: true },
    driverName: { type: String, required: true },

    pricePerUnit: { type: Number, required: true },
    total: { type: Number, required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["เติมน้ำมัน", "ตัดรอบ"],
      default: "เติมน้ำมัน",
    },
    notes: { type: String },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fuel", FuelSchema);
