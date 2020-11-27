const mongoose = require('mongoose');

const BannedSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
}, {
    collection: 'workforce-banned'
});

module.exports = mongoose.model('workforce-banned', BannedSchema);
