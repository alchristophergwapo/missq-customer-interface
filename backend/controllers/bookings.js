const express = require("express");
const routes = express.Router();

const Booking = require("../models/Booking");
const Customers = require("../models/User");



routes.route("/book_service").post((request, response) => {
    const booking = new Booking(request.body);

    booking.save().then(newBooking => {
        if (newBooking) {
            Customers.findOne({ _id: newBooking.author._id }).then(author => {
                if (author) {

                    if (!author.bookings) {
                        author['bookings'] = [];
                    }
                    author.bookings.push(booking);

                    author.save();

                    response.status(200)
                        .send({ status: 200, message: "Bookings successfully added.", bookings: author.bookings });
                }
            }).catch(error => {
                // console.log(error);
                response.status(400).send({ status: 400, message: error })
            });
        }
    }).catch(error => {
        response.status(400).send({ status: 400, message: error })
    });
});

routes.route("/mark_done/:_id").post((request, response) => {
    Booking.findById({ _id: request.params._id }).then(booking => {

        if (booking) {
            booking.status = "Completed"
            if (booking.schedule == null) {
                booking.schedule = new Date('2020-12-04T13:00:00.000+00:00')
            }

            booking.save().then(updatedBooking => {
                if (updatedBooking) {
                    response.status(200).send({ status: 200, message: "Successfully marked as done.", booking: updatedBooking })
                }
            }).catch(error => {
                response.status(400).send({ status: 400, message: error })
            })
        }
    })
})

//FILTERED ALL ONGOINGS

routes.route("/filteredOngoing").post((req, res) => {
    Booking.find({ author: req.body.author, status: req.body.status })
        .populate({
            path: "bookedBy",
            select: "*"
        })
        .then(booking => {
            res.status(200).send({ status: 200, message: "Status:", data: booking })
        }).catch(error => {
            console.log(error);

        })
});

module.exports = routes;
