"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const cors = require('cors')
// const mongoose = require('mongoose');

require('dotenv').config();

const  app  =  express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());

// const uri = "mongodb://127.0.0.1/missqassociates";

// mongoose.connect(uri, {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true }).then(() => {
//     console.log("Connection to database is established!")
// }).catch((error) => {
//     console.log("Error",error);
// });

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://msqassociates:msqassociates@123@cluster0.uc6o6.mongodb.net/MsQAssociates?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const authentication = require('./controllers/authentication');

app.use('/authenticate', authentication);

const  port  =  process.env.PORT  ||  3000;

app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 
