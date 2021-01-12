const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const PasswordReset = require('../models/PasswordReset');
const Customer = require('../models/User');
const Code = require('../models/PasswordReset');

const cryptoRandomString = require('crypto-random-string');

let codeToSend = '';

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '221d4eca',
    apiSecret: 'HLQ0NJgby7JNwZUE',
});

const from = 'MsQ Associates';
let sendTo = '';
let text = '';


routes.route('/request_code').post((request, response) => {
    // console.log(request.body);

    Customer.findOne({ email: request.body.email }).then((customer) => {
        console.log("Customer: ", customer);

        let usercode = customer.code;

        sendTo = "63" + customer.phone;
        console.log(sendTo);

        if (!customer) {
            response.status(404).send({ 'status': 404, 'message': 'The email address ' + request.body.email + ' is not associated with any account. Double-check your email address and try again.' })
        }
        // if (customer && customer.resetPasswordExpires == null || customer.resetPasswordExpires == '') {

        //     customer.resetPasswordExpires = Date.now() + 3600000;

        //     customer.save().then(cust => {
        //         console.log("Reset Pass Expires", cust.resetPasswordExpires);


        //     })

        // } else {

        // if (customer.resetPasswordExpires <= Date.now()) {

        const codeGenerated = cryptoRandomString({ length: 10, type: 'alphanumeric' });

        let newPassResetCode = generateCode(codeGenerated, customer);
        // console.log(newPassResetCode);

        Code.findOne({ customer: customer, availabe: true }).then(code => {
            // console.log(code);
            if (!code) {
                newPassResetCode.save().then(newCode => {
                    console.log("New Code", newCode.code);

                    if (newCode) {
                        codeToSend = newCode.code;
                        text = "You are receiving this is because you (or someone does) have requested the reset of the password or your account.\n\n"
                            + 'Please enter the following code to complete the process within one hour if receiving this: \n'
                            + `${codeToSend}\n\n`
                            + 'If you did not request this, please ignore this SMS and your password will remain unchanged.\n'

                        nexmo.message.sendSms(from, sendTo, text);

                        let sendMail = sendEmail(codeToSend, customer.email);

                        if (!sendMail && sendMail != null)
                            response.status(400).send({ 'status': 400, 'message': `We can't send the code to the your email.` });
                        else
                            response.status(200).send({ 'status': 200, 'message': `We have sent the code to your email.`, 'user': customer });
                    } else {
                        response.status(400).send({ 'status': 400 });
                    }
                })
            } else {
                codeToSend = code.code;
                text = "You are receiving this is because you (or someone does) have requested the reset of the password or your account.\n\n"
                    + 'Please enter the following code to complete the process within one hour if receiving this: \n'
                    + `${codeToSend}\n\n`
                    + 'If you did not request this, please ignore this SMS and your password will remain unchanged.\n'
                let sendMail = sendEmail(codeToSend, customer.email)

                nexmo.message.sendSms(from, sendTo, text);

                if (!sendMail && sendMail != null)
                    response.status(400).send({ 'status': 400, 'message': `We can't send the code to the your email.` });
                else
                    response.status(200).send({ 'status': 200, 'message': `We have sent the code to your email.`, 'user': customer });
            }
        })


        // }
        // else {

        //     customer.resetPasswordExpires = Date.now() + 3600000;

        //     customer.save().then(cust => {
        //         console.log("Reset Pass Expires on else: ", cust.resetPasswordExpires);

        //     })
        // }
        // }

    })
})

routes.route('/check_code').post((request, response) => {

    if (codeToSend == request.body.code)

        response.status(200).send({ 'status': 200 });

    else
        response.status(400).send({ 'status': 400 });

})

routes.post('/update_password/', (request, response) => {

    const password = bcrypt.hashSync(request.body.password);

    Customer.findByIdAndUpdate({ _id: request.body._id }).then((customer) => {

        console.log(customer);


        if (customer)

            Code.findOne({ code: codeToSend }).then(usercode => {
                console.log(usercode);

                if (usercode)
                    customer.password = password

                customer.save().then((newAccount) => {
                    // console.log(newAccount);
                    if (newAccount)
                        response.status(200).send({ 'status': 200 });
                    else
                        response.status(400).send({ 'status': 400 });

                })
                usercode.available = false;
                usercode.save();
            })

                ; else {
            response.status(404)
        }
    })
})


generateCode = (codeGenerated, customer) => {

    let newPassResetCode = new PasswordReset({
        code: codeGenerated,
        customer: customer,
        available: true
    })

    return newPassResetCode;

}

sendEmail = (code, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'msqintern0@gmail.com',
            pass: 'msqassociates'
        }
    })

    const mailOptions = {
        from: 'msqintern0@gmail.com',
        to: email,
        subject: 'Code for Password Reset',
        text: 'You are receiving this is because you (or someone does) have requested the reset of the password or your account. \n\n'
            + 'Please enter the following code to complete the process within one hour if receiving this: \n'
            + `${code}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(`Error : ${err}`);

            return false;
        } else {

            console.log(`Code sent to ${email}`);
            
            return true;
        }
    })
}

module.exports = routes