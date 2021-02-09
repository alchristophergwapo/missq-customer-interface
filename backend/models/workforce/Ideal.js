const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artisan = require('../Artisan.js');

const IdealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artisan',
        localfield: '_id',
        required: true
    },
    // workerInfo: {
    //     name: {
    //         type: String,
    //         ref: 'Artisan',
    //         localField: 'name',
    //         required: true
    //     },
    //     address: {
    //         type: String,
    //         ref: 'Artisan',
    //         localField: 'address',
    //         required: true
    //     },
    //     bday: {
    //         type: Date,
    //         ref: 'Artisan',
    //         localField: 'bday',
    //         required: true
    //     },
    //     phone: {
    //         type: String,
    //         ref: 'Artisan',
    //         localField: 'phone',
    //         required: true
    //     },
    //     email: {
    //         type: String,
    //         ref: 'Artisan',
    //         localField: 'email',
    //         required: true
    //     }
    // }
}, {
        collection: 'workforce-ideal'
    }
);


module.exports = mongoose.model('workforce-ideal', IdealSchema);