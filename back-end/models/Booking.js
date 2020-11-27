const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Booking = new Schema({
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
    phone: {
        type: String,
        required: true
    }
}, {
    collection: 'msq_service_bookings'
}
);

module.exports = mongoose.model("Booking",Booking)