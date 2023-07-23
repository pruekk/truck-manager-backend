const mongoose = require("mongoose");
const TripSchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true, unique: true },
    tripName: {
      type: String,
      enum: [
        "แผ่นพื้น",
        "งานนอก",
        "ล่วงเวลา",
        "งานนอกเด็กอู่",
        "ล่วงเวลาเด็กอู่",
      ],
    },
    amount: { type: Number, default: 0 },
    date: { type: Date },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);

/* per factory
    แผ่นพื้น       50
    งานนอก      100
    ล่วงเวลา     30  dp from 18:01 PM to 05:59 AM
    งานนอกเด็กอู่  60
    ล่วงเวลาเด็กอู่ 40  dp from 18:01 PM to 05:59 AM
*/
