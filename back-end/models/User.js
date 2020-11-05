const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	phone: {
		type: Number,
		required: true,
	},
	email :{
		unique: true,
		type: String,
		required: true
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
},{
		collection: 'User'
});

module.exports = mongoose.model('User', User);