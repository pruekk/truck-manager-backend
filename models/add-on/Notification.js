const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String },

    sender: { type: String, required: true },
    recipients: [
      {
        recipient: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["email", "line"],
          default: "email",
        },
      },
    ],

    notifyDate: [
      {
        type: Date,
        require: true,
      },
    ],
    notifyDateEnd: { type: Date },
    notifySequential: {
      type: String,
      enum: ["minute", "hour", "day", "month", "year"],
    },
    is_actived: { type: Boolean, default: true },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);

/*
  title: "จ่ายค่าน้ำมัน",
  message: "จ่ายค่าน้ำมันปั๊มบางจากบ้านบึงทุกวันที่ 1 และ 15 ของเดือน",

  senderEmail: "sender@gmail.com",
  recipientsEmail: [
    {
      recipient: "recipient1@gmail.com"
      type: "email"
    },
    {
      recipient: "@line",
      type: "line"
    }
  ],

  notifyDateStart: [
    2023-01-01T03:00:00.000+00:00,
    2023-01-15T03:00:00.000+00:00,
  ]
  notifyDateEnd: 2023-12-31T03:00:00.000+00:00,
  notifySequential: "month"

  Using cron-schedule 
    query where is_actived = true
    if notifyDateEnd > Date.now() : is_actived: false
*/
