const mongoose = require("mongoose");

const CompanyIncomeSchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true },
    date: { type: Date },
    type: {
      type: String,
      enum: ["วิ่งเที่ยว", "การันตีเที่ยว", "โยกรถ", "ซ่อมรถ", "อื่นๆ"],
    },
    detail: { type: String },
    total: { type: Number },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyIncome", CompanyIncomeSchema);
