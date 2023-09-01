const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    allowedFactories: [
      {
        factoryId: {
          type: String,
        },
        factoryName: {
          type: String,
        },
      },
    ],
    allowedFeatures: [
      {
        name: {
          type: String,
          unique: true,
        },
        view: {
          type: Boolean,
          default: false,
        },
        add: {
          type: Boolean,
          default: false,
        },
        edit: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
    ],
    is_actived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
