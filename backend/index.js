"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const url = "mongodb://127.0.0.1/missqassociates";
const url = "mongodb://msqassociates:sunz8lyoztRAkVIw@cluster0-shard-00-00.uc6o6.mongodb.net:27017,cluster0-shard-00-01.uc6o6.mongodb.net:27017,cluster0-shard-00-02.uc6o6.mongodb.net:27017/MsQAssociates?ssl=true&replicaSet=atlas-7q3496-shard-0&authSource=admin&retryWrites=true&w=majority"

const connectionParams = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
};

mongoose.Promise = global.Promise;
mongoose.connect(url, connectionParams).then(() => {
    console.log('Connected to database!');

}).catch(err => {
    console.error(`Error connecting to the database. \n${err}`);

})

const authentication = require('./controllers/authentication');
const msq_service = require('./controllers/bookings');
const forgot_password = require('./controllers/forgotPassword');
const rate_artisan = require('./controllers/rateArtisan');


app.use('/authenticate', authentication);
app.use('/msq_service', msq_service);
app.use('/forgot_password', forgot_password);
app.use('/reviews', rate_artisan)

app.use('/public', express.static('public'));

// app.post('/filteredOngoing', msq_service.filteredOngoing)

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong!'));
    })
})

app.use((err, req, res, next) => {
    console.error(err.message);

    if (!err.statusCode) err.statusCode = 500;

    res.status(err.statusCode).send(err.message);

})

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
});