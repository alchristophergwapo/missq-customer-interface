const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secretkey23456";

const Customer = require("../models/User");

const multer = require('multer');

const DIR = '../backend/public/images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(req);
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

routes.post("/register",
    // upload.single('id_image'),
    upload.single('picture'),
    (request, response, next) => {

        console.log(request.file);
        // return request.body
        // upload.single('picture');
        // upload.single('id_image');

        // const url = request.protocol + "://" + request.hostname + ':' + 8080 + '/' + 'public/images/';

        // let pass = bcrypt.hashSync(request.body.password);

        // let account = new Customer(request.body);

        // account['password'] = pass;
        // account['picture'] = Date.now() + '-' + request.body.picture;
        // account['id_image'] = Date.now() + '-' + request.body.id_image;
        // console.log(request.file);

        // account
        //     .save()
        //     .then(user => {
        //         const expiresIn = 24 * 60 * 60;
        //         const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
        //             expiresIn: expiresIn
        //         });
        //         response
        //             .status(200)
        //             .json({
        //                 user: user,
        //                 access_token: accessToken,
        //                 expires_in: expiresIn,
        //                 status: 200
        //             });
        //         console.log('User created: ', user);

        //     })
        //     .catch(error => {
        //         console.log("Error => ", error);
        //         response.status(400).send("Failed to store to database!", error.body);
        //     });
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

            console.log('User: ',user);

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

// routes.route("/forgot-password").get((req, res) => {
//     res.render('forgot-password');
// });

// routes.route("/forgot-password").post((req, res) => {

// });


module.exports = routes;