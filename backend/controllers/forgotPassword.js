const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const PasswordReset = require('../models/PasswordReset');
const Customer = require('../models/User');
const Code = require('../models/PasswordReset');

const nodemailer = require("nodemailer");

const cryptoRandomString = require('crypto-random-string');

routes.route('/request_code').post((request, response) => {

    // console.log(request.body);

    Customer.findOne({ email: request.body.email }).then((customer) => {
        // console.log("Customer: ", customer);

        if (!customer) {
            response.status(404).send({ 'status': 404, 'message': 'The email address ' + request.body.email + ' is not associated with any account. Double-check your email address and try again.' })
        }
        if (customer && customer.resetPasswordExpires == null) {

            customer.resetPasswordExpires = Date.now() + 3600000;

            customer.save().then(cust => {
                console.log(cust.resetPasswordExpires);

                if (cust.resetPasswordExpires == Date.now()) {

                    let newPassResetCode = new PasswordReset({
                        code: codeGenerated,
                        customer: customer,
                        availabe: true
                    })

                    newPassResetCode.save().then((code) => {
                        if (code) {

                            const codeGenerated = cryptoRandomString({ length: 10, type: 'alphanumeric' });

                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'msqintern0@gmail.com',
                                    pass: 'msqassociates'
                                }
                            })

                            const mailOptions = {
                                from: 'msqintern0@gmail.com',
                                to: 'christopher.alonzo@student.passerellesnumeriques.org',
                                subject: 'Code for Password Reset',
                                text: 'You are receiving this is because you (or someone does) have requested the reset of the password or your account. \n\n'
                                    + 'Please enter the following code to complete the process within one hour if receiving this: \n'
                                    + `${codeGenerated}\n\n`
                                    + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                            }

                            transporter.sendMail(mailOptions, (err, res) => {
                                if (err) {
                                    response.status(400).send({ 'message': `${err.getMessage()}` });
                                } else {
                                    response.status(200).send({ 'status': 200, 'message': 'We have sent a code to ' + request.body.email + '. Please check your email.', 'user': customer })
                                }
                            })
                        } else {
                            response.status(400).send({ 'status': 400 });
                        }
                    })
                } else {
                    // let code = Code.findOne({
                    //     where: {
                    //         customer: request.body.customer
                    //     }
                    // })

                    // console.log(code);
                    
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: false,
                        auth: {
                            user: 'msqintern0@gmail.com',
                            pass: 'msqassociates'
                        }
                    })

                    const mailOptions = {
                        from: 'msqintern0@gmail.com',
                        // to: 'geneva.rivas@student.passerellesnumeriques.org',
                        to: 'christopher.alonzo@student.passerellesnumeriques.org',
                        subject: 'Code for Password Reset',
                        text: 'You are receiving this is because you (or someone does) have requested the reset of the password or your account. \n\n'
                            + 'Please enter the following code to complete the process within one hour if receiving this: \n'
                            + `${code}\n\n`
                            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    }

                    transporter.sendMail(mailOptions, (err, res) => {
                        if (err) {
                            response.status(400).send({ 'message': `${err}` });
                        } else {
                            response.status(200).send({ 'status': 200, 'message': 'We have sent a code to ' + request.body.email + '. Please check your email.', 'user': customer })
                        }
                    })
                }
            })

        } else {
            console.log(customer);
            
        }

    })
})

routes.route('/check_code').post((request, response) => {

    console.log(request.body);

    Code.findOne({ code: request.body.customer }).then((code) => {
        console.log(request.body.code);

        if (code.customer == request.body.customer) {
            response.status(200).send({ 'status': 200 });
        } else {
            response.status(404).send({ 'status': 404 });
        }
    })
})

routes.post('/update_password/', (request, response) => {

    const password = bcrypt.hashSync(request.body.password);

    Customer.findByIdAndUpdate({ _id: request.body._id }).then((customer) => {

        if (customer) {

            Code.findOne({ code: request.body.code }).then(usercode => {
                usercode.availabe = false;
                usercode.save();
            })

            customer.password = password;

            customer.save().then((newAccount) => {
                console.log(newAccount);

                if (newAccount) {
                    response.status(200).send({ 'status': 200 });
                } else {
                    response.status(400).send({ 'status': 400 });
                }
            })
        } else {
            response.status(404)
        }
    })
})

module.exports = routes