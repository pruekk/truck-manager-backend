const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephone: { type: String },
    birthDate: ISODate("2023-03-14T23:59:59.000Z"),
    idCard: { type: String, required: true },
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
        date: {
          type: Date,
        },
        base: {
          type: Number,
        },
      },
    ],
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
