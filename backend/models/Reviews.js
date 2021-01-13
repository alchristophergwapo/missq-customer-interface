const mongoose = require('mongoose')
const Artisan = require('./artisan-model')
const User = require('./User')

let Reviews = new mongoose.Schema({
    rating: [{
        type: Number,
        required: true,
    }],
    suki: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    }],
    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Artisan,
    }
});

module.exports = mongoose.model('Reviews', Reviews)