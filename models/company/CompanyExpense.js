const mongoose = require("mongoose");

const CompanyExpenseSchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true },
    date: { type: Date },
    type: {
      type: String,
      enum: [
        "เงินเดือนพนักงาน",
        "เหมาน้ำมันคนขับรถ",
        "น้ำมัน",
        "ค่าอะไหล่",
        "ค่าซ่อมข้างนอก",
        "ประกันภัย ต่อทะเบียน ภาษี",
        "อื่นๆ",
      ],
    },
    detail: { type: String },
    total: { type: Number },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyExpense", CompanyExpenseSchema);
