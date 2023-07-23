const mongoose = require("mongoose");

const OilSchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true, unique: true },
    date: { type: Date },
    oils: [
      {
        oilId: { type: String },
        amount: { type: Number, default: 0 },
      },
    ],
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Oil", OilSchema);
