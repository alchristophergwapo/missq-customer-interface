const express = require('express');
const routes = express.Router();

const Nanny = require('../models/Nanny');

routes.route('/post-job').post((request, response) => {
    let nanny = new Nanny(request.body);
    console.log(nanny);

    nanny.save().then((nanny) => {
        console.log("nanny", nanny);
        response.status(200).send({'status': 200});
    }).catch((error)=>{
        console.log(error);
        response.status(400).send({'status': 400, 'error': error})
    })
});

module.exports = routes;