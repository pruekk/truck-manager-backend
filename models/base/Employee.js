const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["นาย", "นาง", "นางสาว", "Mr", "Mrs", "Miss"],
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephone: { type: String },
    birthDate: { type: Date },
    idCard: { type: String, required: true, unique: true },
    address: { type: String },

    role: {
      type: String,
      enum: ["คนขับรถโม่", "เสมียน", "เด็กอู่", "ไร่"],
    },
    type: {
      type: String,
      enum: ["fulltime", "parttime"],
    },
    bases: [
      {
        date: { type: Date },
        base: { type: Number },
      },
    ],
    bankName: { type: String },
    bankAccount: { type: String },

    startDate: { type: Date },
    ssoStartDate: { type: Date },
    endDate: { type: Date },
    ssoEndDate: { type: Date },
    reason: { type: String },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
