const mongo = require('mongoose');
const Schema = mongo.Schema;

// collection and schema for Registration
let User = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    birth_date:{
        type: Date,
        required:true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        required: true
    },
    id_image: {
        type: String,
    },
    id_number: {
        type: Number
    }
}, {
    collection: 'Customers'
});

module.exports = mongo.model('Customers', User);
