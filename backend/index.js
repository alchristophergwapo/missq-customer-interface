"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const uri = "mongodb://127.0.0.1/missqassociates";

const uri = "mongodb+srv://msqassociates:sunz8lyoztRAkVIw@cluster0.uc6o6.mongodb.net/MsQAssociates?retryWrites=true&w=majority";

// const uri = "mongodb+srv://msqassociates:sunz8lyoztRAkVIw@cluster0.uc6o6.mongodb.net/MsQAssociates";

// const uri = "mongodb://msqassociates:sunz8lyoztRAkVIw@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/MsQAssociates?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true"

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Connected to database!');
    
}).catch((err) => {
    console.log("Error: ", err)
});

const authentication = require('./controllers/authentication');
const msq_service = require('./controllers/bookings');

app.use('/authenticate', authentication);
app.use('/msq_service', msq_service);

app.use('/public', express.static('public'));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
});
