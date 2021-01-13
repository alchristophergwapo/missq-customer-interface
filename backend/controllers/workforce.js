const express = require('express');
const app = express();
const routes = express.Router();
const ObjectId = require('mongodb').ObjectID;

const bodyParser = require('body-parser');

//load in the mongoose models
const Ideal = require('../models/workforce/Ideal');
const Banned = require('../models/workforce/Banned');
const Artisan = require('../models/Artisan');


//load middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Display ideal lists
routes.route('/ideal').get((req, res) => {
    Ideal.find().then((ideals) => {
        res.send(ideals);
    }).catch((e) => {
        res.send(e);
    })
});

//Display banned lists
routes.route('/banned').get((req, res) => {
    Banned.find().then((banned) => {
        res.send(banned);
    }).catch((e) => {
        res.send(e);
    })
});

//Display information
routes.route('/ideal/information/:id').get(async(req, res) => {
    const worker = new Artisan(request.body);

    const ideal = await Ideal.findById(req.params.id).populate(worker);

    res.status(200)
        .send({ status: 200, ideal });

});



//Delete ideal By Using Req.Params
routes.route('/ideal/:id').delete((req, res) => {
    Ideal.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Dalete banned By Using Req.Params
routes.route('/banned/:id').delete((req, res) => {
    Banned.deleteOne().then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});


//Delete By Using Req.Body
// routes.route('/ideal/:id'),post((res, req, next) => {
//     console.log(req.body);

//     Ideal.deleteOne({ _id:req.body.id}).then(
//         () => {
//             res.status(200).json({
//                 message: 'Deleted!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );

// });

// routes.route('/ideal').post((req, res) => {
//     let title = req.body.title;

//     let newIdeal = new Ideal({
//         title
//     });

//     newIdeal.save().then((idealDoc) => {
//         res.send(idealDoc);
//     });
// });

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
// Ideal.findOneAndRemove(req.params.id,
//     function (err, ideal) {
//         if (err) {
//             res.send('error removing')
//         } else {
//             console.log(ideal);
//             res.status(204);
//         }
//     });


module.exports = routes;