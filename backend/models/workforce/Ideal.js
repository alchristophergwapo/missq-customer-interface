const mongoose = require('mongoose');

const IdealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artisan',
        required: true
    }
}, {
        collection: 'workforce-ideal'
    }
);


module.exports = mongoose.model('workforce-ideal', IdealSchema);