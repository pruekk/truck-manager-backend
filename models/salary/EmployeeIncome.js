const mongoose = require("mongoose");

const EmployeeIncomeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date },
    salary: { type: Number },
    wellBeing: { type: Number }, // สวัสดิการ
    other: { type: Number }, // ล่วงเวลา
    detail: { type: String },
    total: { type: Number },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeIncome", EmployeeIncomeSchema);
