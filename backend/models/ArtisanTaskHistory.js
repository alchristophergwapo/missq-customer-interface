var mongoose = require('mongoose');
const Artisan = require('./Artisan');
const Booking = require('./Booking');

const taskOfUsers = new mongoose.Schema({
    currentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Artisan,
        required: true,
    },
    state: {
        type: Object,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Booking
    }
})
module.exports = mongoose.model('taskofusers', taskOfUsers);