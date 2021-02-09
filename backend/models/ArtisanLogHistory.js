var mongoose = require('mongoose')

const logsHistory = new mongoose.Schema({
    logsOwner: {
        type: String,
        required: true
    },
    jobsOfferedThroughId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('logsHistory', logsHistory);