const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true, unique: true },
    licensePlate: { type: String, required: true, unique: true },
    carType: {
      type: String,
      enum: ["รถโม่", "รถน้ำ", "รถทั่วไปบริษัท", "รถที่ไร่", "รถส่วนตัว"],
      required: true
    },
    initialWeight: { type: Number },
    buyDate: { type: Date },
    buyFrom: { type: String },
    taxDate: { type: Date },
    proposalDate: { type: Date },
    insuranceDate: { type: Date },
    registrationDate: { type: Date },
    price: { type: Number },
    vatPrice: { type: Number },
    netPrice: { type: Number },
    status: {
      type: String,
      enum: ["ใช้งาน", "ขายแล้ว", "จอดซ่อม"],
      default: "ใช้งาน"
    },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
