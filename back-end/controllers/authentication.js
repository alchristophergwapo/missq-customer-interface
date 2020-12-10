const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET_KEY = "secretkey23456";

const Customer = require("../models/User");

const multer = require('multer');

const DIR = '../public/images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

routes.route("/register").post((request, response) => {
    // upload.single('picture', response=>{
    //   console.log(response);
    // });
    // upload.single('id_image');

    const url = request.protocol + "://" + request.hostname + ':' + 8080 + '/' + 'public/images/';

    let pass = bcrypt.hashSync(request.body.password);

    let account = new Customer(request.body);

    // account['password'] = pass;
    // account['picture'] = url + Date.now() + '-' +request.body.picture;
    // account['id_image'] = url + Date.now() + '-' +request.body.id_image;
    console.log(request.file);

    // account
    //   .save()
    //   .then(user => {
    //     const expiresIn = 24 * 60 * 60;
    //     const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
    //       expiresIn: expiresIn
    //     });
    //     response
    //       .status(200)
    //       .json({
    //         user: user,
    //         access_token: accessToken,
    //         expires_in: expiresIn,
    //         status: 200
    //       });
    //   })
    //   .catch(error => {
    //     console.log("Error => ", error);
    //     response.status(400).send("Failed to store to database!", error.body);
    //   });
});

routes.route("/login").post((req, res) => {
    Customer.findOne({ email: req.body.email })
        .populate({
            path: "bookings",
            select: "service_booking service_location cost notes schedule status"
        })
        .then(user => {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
                expiresIn: expiresIn
            });
            if (user) {
                let passMatch = bcrypt.compareSync(req.body.password, user.password);

                if (passMatch) {
                    res
                        .status(200)
                        .send({
                            user: user,
                            access_token: accessToken,
                            expires_in: expiresIn,
                            status: 200
                        });
                } else {
                    res
                        .status(400)
                        .send({ error: "Password doesn't match!", status: 400 });
                    // res.flash('error', " Password doesn't match!")
                }
            } else {
                res.status(400).send({ status: 400 });
            }
        })
        .catch(error => {
            console.log("Error ", error);
        });
});

routes.route("/forgot-password").get((req, res) => {
    res.render('forgot-password');
});

routes.route("/forgot-password").post((req, res) => {

});


module.exports = routes;