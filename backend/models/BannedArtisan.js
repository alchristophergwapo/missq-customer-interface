const mongoose = require("mongoose")
let Artisan = require("./Artisan");

const Banned = new mongoose.Schema({
    artisan: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Artisan
    }]
})

module.exports = mongoose.model("Banned", Banned);