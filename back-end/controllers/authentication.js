const express = require('express')
const routes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "secretkey23456";

const User = require('../models/User');

routes.route('/register').post((request, response) => {
    let pass = bcrypt.hashSync(request.body.password)

    let account = new User({
        name: request.body.name,
        address: request.body.address,
        phone: request.body.phone,
        email: request.body.email,
        password: pass,
        picture: request.body.picture,
        id_image: request.body.id_image,
        id_number: request.body.id_number
    });
    account.save().then((user) => {
        response.status(200).status({ 'status': 200 });
        console.log(user);
    }).catch((error) => {
        console.log("Error ", error);
        response.status(400).send("Failed to store to database!", error.body);
    });
});

routes.route('/login').post((req, res) => {
    console.log(req.body.email);
    User.findOne({ email: req.body.email }).then((user) => {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        if (user) {
            console.log(user);
            res.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn, "status": 200 });
        } else {
            res.status(400).send({ 'status': 400 });
        }
    });
});

module.exports = routes;