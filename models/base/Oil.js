const mongoose = require("mongoose");

const OilSchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true },
    date: { type: Date, required: true },
    oils: [
      {
        oilId: { type: String, required: true },
        amount: { type: Number, default: 0, required: true },
      },
    ],
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);
OilSchema.index({ factoryId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Oil", OilSchema);
