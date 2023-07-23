const mongoose = require("mongoose");

const CarReplacementSchema = new mongoose.Schema(
  {
    date: { type: Date },
    carId: { type: String, required: true },
    driverName: { type: String, required: true },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarReplacement", CarReplacementSchema);
