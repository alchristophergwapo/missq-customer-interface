const express =  require('express');
const app = express();
const routes = express.Router();
// const port = 3000

// const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//load in the mongoose models
const Ideal = require('../models/workforce/Ideal');
const Banned = require('../models/workforce/Banned');


//load middleware
app.use(bodyParser.json());


// CORS HEADER MIDDLEWARE
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
// 	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers','*');
// 	res.setHeader('Access-Control-Allow-Credentials','true');
//     next();
//   });


routes.route('/ideal').post((req, res) => {
    let title  = req.body.title;

    let newIdeal = new Ideal({
        title
    });

    newIdeal.save().then((idealDoc) => {
        res.send(idealDoc);
    });
});

routes.route('/ideal').get((req, res) => {
    Ideal.find().then((ideals) => {
        res.send(ideals);
    }).catch((e) => {
        res.send(e);
    })
});

routes.route('/ideal/:id').delete((res, req) => {
    Ideal.findOneAndRemove({
        _id: req.params.id
    },
    function(err,ideal) {
        if(err) {
            res.send('error removing')
           } else {
            console.log(ideal);
            res.status(204);
          }
    });
});

// app.get('/workforce/ideal', (req,res) => {
//     // res.send("You've reached this far.");
//     Ideal.find().then((ideals) => {
//         res.send(ideals);
//     }).catch((e) => {
//         res.send(e);
//     })
// });

// app.post('/ideal',(req,res) => {
//     let title  = req.body.title;

//     let newIdeal = new Ideal({
//         title
//     });

//     newIdeal.save().then((idealDoc) => {
//         res.send(idealDoc);
//     });
// });

// app.patch('/ideal/:id', (req,res) => {
//     Ideal.findOneAndUpdate({_id: req.params.id}, {
//         $set: req.body
//     }).then(() => {
//         res.sendStatus(200);
//     });

// });

// app.delete('/ideal/:id',(req, res) => {
//     Ideal.findOneAndRemove({
//         _id: req.params.id
//     },
//     function(err,ideal) {
//         console.log("Deleting Product " + req.params.id);
//         res.json(ideal)
//     });
// });

// app.delete('/ideal/:id', (req, res) =>
//  Ideal.findOneAndRemove({
//   _id: req.params.id
//  }, (err, ideal) => {
//   if(err) {
//    res.send('error removing')
//   } else {
//    console.log(ideal);
//    res.status(204);
//  }
// }));


// app.get('/ideal/:idealId/banned',(req, res) => {
//     Banned.find({
//         _idealId: req.params.idealId
//     }).then((banned) => {
//         res.send(banned);
//     });
// });

// app.post('/ideal/:idealId/banned',(req,res) => {
//     let newBanned = new Banned({
//         title: req.body.title,
//         _idealId: req.params.idealId,
//     });
//     newBanned.save().then((newBannedDoc) => {
//         res.send(newBannedDoc);
//     });
// });

// app.patch('/ideal/:idealId/banned/:bannedId', (req, res) => {
//     Banned.findOneAndUpdate({
//         _id: req.params.bannedId,
//         _idealId: req.params.idealId
//     }, {
//         $set: req.body
//         }
//     ).then(() => {
//         res.sendStatus(200);
//     });
// });

// app.delete('/ideal/:idealId/banned/:bannedId', (req,res) => {
//     Banned.findOneAndRemove({
//         _id: req.params.bannedId,
//         _idealId: req.params.idealId
//     }).then((removeBannedDocs) => {
//         res.send(removeBannedDocs);
//     })
// });
// app.listen(port, () => {
//     console.log(`Server is listening to port ${port}`);
// });
module.exports = routes;