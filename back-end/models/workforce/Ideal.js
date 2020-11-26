const mongoose = require('mongoose');

const IdealSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        minlength : 1,
        trim : true,
    }
}, {
    collection: 'workforce-ideal'
});


module.exports = mongoose.model('workforce-ideal', IdealSchema);

