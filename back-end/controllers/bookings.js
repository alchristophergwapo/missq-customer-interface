const express = require("express");
const routes = express.Router();

const Booking = require("../models/Booking");
const Customers = require("../models/User");

routes.route("/book_service").post((request, response) => {
  let booking = new Booking(request.body);
  console.log(booking);

  booking
    .save()
    .then(booked => {
      console.log("booking", booked);
      response.status(200).send({ status: 200 });
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ status: 400, error: error });
    });
});

routes.route("/bookings/:_id").get((request, response) => {
  Booking.find({ author: request.params._id })
    .then(booking => {
      response.status(200).send({ status: 200, booking: booking });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = routes;
