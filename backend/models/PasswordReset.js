const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = require('./User')

let PasswordReset = new Schema({
    code: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer,
        required: true
    },
    available: {
        type: Boolean
    },
},
{
    timestamps: true
}

)

module.exports = mongoose.model('PasswordReset', PasswordReset);