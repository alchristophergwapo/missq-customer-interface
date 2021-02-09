const express = require('express');
const routes = express.Router();
const Artisan = require('../models/Artisan');
const Reviews = require('../models/Reviews');
const Banned = require('../models/BannedArtisan');
const Booking = require('../models/Booking');
const ArtisanLogHistory = require('../models/ArtisanLogHistory');

routes.route('/rate_artisan/:_id').post((request, response) => {
    ArtisanLogHistory.find()
})

routes.route('/ban_artisan/:_id').post((req, res) => {
    Artisan.findById({ _id: req.params._id }).then((artisan) => {
        if (artisan) {
            let banned = new Banned();

            banned.artisan.push(artisan);

            banned.save().then(ban => {
                res.status(200).send({ status: 200, message: "Added to banned Artisans.", artisan: ban })
            })
        }
    }).catch((error) => {
        console.log(error);

    })
})

routes.route('/tag_suki/:_id').post((req, res) => {
    Artisan.findById({ _id: req.params._id }).then(artisan => {
        if (artisan) {
            Reviews.findOne({ artisan: artisan }).then(artisanReview => {
                artisanReview.suki.push(req.body.customer)
                artisanReview.save().then(suki => {
                    if (suki) {
                        res.status(200).send({ status: 200, message: "Successfully tagged as suki." })
                    }
                })
            }).catch(error => {
                console.log(error);

            })
        }
    }).catch(error => {
        console.log(error);
    })
})

module.exports = routes;