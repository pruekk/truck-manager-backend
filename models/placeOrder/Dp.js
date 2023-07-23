const mongoose = require("mongoose");

const DpSchema = new mongoose.Schema(
  {
    dpId: { type: String, required: true },
    date: { type: Date, required: true },
    destinationName: { type: String },
    distance: { type: Number },
    distanceCode: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number },
    oil: { type: Number },
    carId: { type: String, required: true },
    driverName: { type: String, required: true },
    status: {
      type: String,
      enum: ["Accepted", "Canceled", "Spoiled"],
      default: "Accepted",
    },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dp", DpSchema);
