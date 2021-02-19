const express = require('express');
const app = express();
const routes = express.Router();

const bodyParser = require('body-parser');

//load in the mongoose models
const Ideal = require('../models/workforce/Ideal');
const Banned = require('../models/workforce/Banned');
const Artisan = require('../models/Artisan');

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

//Display ideal information
routes.route('/ideal/information/:id').get((req, res, next) => {

    Artisan.findById(req.params.id).then((w) => {
        res.send(w);
    }).catch((error) => {
        res.send(error);
    });
});

//Display banned infomation
routes.route('/banned/information/:id').get((req,res, next) => {

    Banned.findById(req.params.id).then((w) => {
        res.send(w);
    }).catch((eror) => {
        res.send(error);
    });
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


//Delete id using Req.Body
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

module.exports = routes;