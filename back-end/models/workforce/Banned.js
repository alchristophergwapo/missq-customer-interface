const mongoose = require('mongoose');

const BannedSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    _idealId : {
        type: mongoose.Types.ObjectId,
        required:true,
    }
});

const Banned = mongoose.model('Banned', BannedSchema);

module.exports = { Banned };