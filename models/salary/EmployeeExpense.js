const mongoose = require("mongoose");

const EmployeeExpenseSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date },
    expense: { type: Number },
    sso: { type: Number },
    other: { type: Number },
    detail: { type: String },
    total: { type: Number },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeExpense", EmployeeExpenseSchema);
