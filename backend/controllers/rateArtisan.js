const express = require('express');
const routes = express.Router();
const Artisan = require('../models/Artisan');
const Reviews = require('../models/Reviews');

routes.route('/rate_artisan/:email').post((request, response) => {
    Artisan.findOne({email: request.params.email}).then(artisan => {
        if (artisan) {
            let review = new Reviews({
                author: request.body.author
            });
        }
    })
})

module.exports = routes;