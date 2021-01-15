const express = require("express");
const routes = express.Router();

const Booking = require("../models/Booking");
const Customers = require("../models/User");

routes.route("/book_service").post(async(request, response) => {
    const booking = new Booking(request.body);

    await booking.save();

    const author = await Customers.findById({ _id: booking.author });

    author.bookings.push(booking);

    response.status(200)
        .send({ status: 200, bookings: author.bookings });

    await author.save();
});

module.exports = routes;