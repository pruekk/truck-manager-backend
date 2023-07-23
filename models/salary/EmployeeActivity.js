const mongoose = require("mongoose");

const EmployeeActivitySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date },
    amount: { type: Number },
    type: {
      type: String,
      enum: [
        "sick_leave",
        "personal_leave",

        "electric_bill",
        "water_bill",
        "garbage_bill",
        "rent_bill",
        "oil_bill",
        "other_bill",
      ],
    },
    detail: { type: String },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeActivity", EmployeeActivitySchema);
