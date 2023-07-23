const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true, unique: true },
    licensePlate: { type: String, required: true, unique: true },
    carType: {
      type: String,
      enum: ["รถโม่", "รถน้ำ", "รถทั่วไป"],
    },
    buyDate: { type: Date },
    buyFrom: { type: String },
    taxDate: { type: Date },
    proposalDate: { type: Date },
    insuranceDate: { type: Date },
    registrationDate: { type: Date },
    price: { type: Number },
    vatPrice: { type: Number },
    netPrice: { type: Number },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
