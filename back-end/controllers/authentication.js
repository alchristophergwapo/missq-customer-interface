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
        code: request.body.code,
        phone: request.body.phone,
        email: request.body.email,
        birth_date: request.body.birth_date,
        password: pass,
        picture: request.body.picture,
        id_image: request.body.id_image,
        id_number: request.body.id_number
    });

    account.save().then((user) => {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        re.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn, "status": 200 });
    }).catch((error) => {
        console.log("Error => ", error);
        response.status(400).send("Failed to store to database!", error.body);
    });
});

routes.route('/login').post((req, res) => {

    User.findOne({ email: req.body.email }).then((user) => {
        // console.log(user);
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        if (user) {

            let passMatch = bcrypt.compareSync(req.body.password, user.password);

            if (passMatch) {
                res.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn, "status": 200 });
            } else {
                res.status(400).send({ 'error': "Password doesn't match!", 'status': 400 })
            }

        } else {
            res.status(400).send({ 'status': 400 });
        }
    }).catch(error => {
        console.log('Error ', error)
    });
});

routes.route('/profile').post((req, res) =>{
    console.log('nisulod sa backend.')

    var item = {
        phone : req.body.phone
    }
    // var update = User.updateOne({_id: "5fb5d66bd0e42226fcb0b128"}, {$set : {'phone' : '12345'}})
    User.updateOne({_id: "5fb5d66bd0e42226fcb0b128"}, {$set : {'phone': req.body.phone}}).then((res) =>{
        console.log('contact info username :  ' + JSON.stringify(res))
        res.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn, "status": 200 });
    }).catch(error => {
        console.log('Error ', error)
    });
});

module.exports = routes;