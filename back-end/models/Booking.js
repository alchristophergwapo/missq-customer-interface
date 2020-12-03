const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Booking = new Schema(
  {
    service_booking: {
      type: String,
      required: true
    },
    service_location: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    notes: {
      type: String,
      required: true
    },
    schedule: {
      type: Date,
      required: true
    },
    status: {
        type: String,
        required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customers',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Bookings", Booking);
