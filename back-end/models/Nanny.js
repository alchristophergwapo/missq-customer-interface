const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Nanny = new Schema({
    work: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, {
    collection: 'nanny-job-posting'
}
);

module.exports = mongoose.model(Nanny)