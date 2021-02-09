"use strict";
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

//Live Chat
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1136505",
    key: "613fad3a31bf82b52dc3",
    secret: "9836091da1cea455ad32",
    cluster: "ap1",
    useTLS: true
});

pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});

var messages = [];

// app.post('/messages', (req, res) => {
//     messages.push(req.body);
//     pusher.trigger('chat', 'message', messages);
//     res.send(messages);
// });

// app.get('/api/allMessages', (req, res) => {
//     res.send(messages)
// })

// app.use(passport.initialize());
// var passportMiddleware = require('./middleware/passport');
// passport.use(passportMiddleware);

// var routes = require('./routes');
// app.use('/api', routes);

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    const { body } = req;
    const { text, id } = body;
    const result = sentiment.analyze(text);
    const comparative = result.comparative;
    const tone =
      comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';
    const data = {
      text,
      id,
      timeStamp: new Date(),
      sentiment: {
        tone,
        score: result.score,
      },
    };
    pusher.trigger('chat', 'message', data);
    res.json(data);
  });

  app.get('/chat/allMessages', (req, res) => {
    res.send(messages)
})
//Live Chat

// const MongoClient = require('mongodb').MongoClient;

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
const workforce = require('./controllers/workforce');
const forgot_password = require('./controllers/forgotPassword');
const rate_artisan = require('./controllers/rateArtisan');


app.use('/authenticate', authentication);
app.use('/msq_service', msq_service);
app.use('/forgot_password', forgot_password);
app.use('/workforce', workforce);

app.use('/public', express.static('public'));
app.use('/reviews', rate_artisan);

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
