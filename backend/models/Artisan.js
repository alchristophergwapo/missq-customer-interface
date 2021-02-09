var mongoose = require('mongoose');

var ArtisansSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'full Name is required'
    },
    address: {
        type: String,
        required: 'address is required'
    },
    bday: {
        type: Date,
        required: 'Birth Day is required'
    },
    phone: {
        type: String,
        required: 'phone is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'email is required',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: 'password is required'
    },
    selfie: {
        type: String,
        required: 'selfie is required'
    },
    primaryIdPic: {
        type: String,
        required: 'primaryIdPic is required'
    },
    primaryIdNum: {
        type: String,
        required: 'primaryIdNum is required'
    },
    nbi: {
        type: String,
        required: 'nbi is required'
    },
    applyJob: {
        type: String
    },
    tutorFile: {
        type: String
    },
    nannyFile: {
        type: String
        
    },
    housekeepingFile: {
        type: String
        
    },
    haircutMassageFile: {
        type: String
        
    },
});
 
module.exports = mongoose.model('Artisans', ArtisansSchema);