// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// CALL LOCAL LIBRARIES
// call lang to get accepted language from request
var requestHandler  = require('./lib/request-handler')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// ----------------------------------------------------

// on routes that end in /danhngon
// ----------------------------------------------------
router.route('/danhngon')

    // create a danhngon (accessed at POST http://localhost:8080/api/danhngon)
    .post(function(req, res) {
        requestHandler.handlePost(req, res);
    })

    // get all the danhngon (accessed at GET http://localhost:8080/api/danhngon)
    .get(function(req, res) {
        requestHandler.handleGet(req, res);
    });

// on routes that end in /danhngon/random
// ----------------------------------------------------
router.route('/danhngon/random')

    // get the random danhngon (accessed at GET http://localhost:8080/api/danhngon/random)
    .get(function(req, res) {
        requestHandler.handleGetRandom(req, res);
    });

// on routes that end in /danhngon/random
// ----------------------------------------------------
router.route('/danhngon/random/:translatedlanguage')

    // get the random danhngon (accessed at GET http://localhost:8080/api/danhngon/random)
    .get(function(req, res) {
        requestHandler.handleGetRandomWithLang(req, res);
    });

// on routes that end in /danhngon/:danhngon_id
// ----------------------------------------------------
router.route('/danhngon/:danhngon_id')

    // get the danhngon with that id (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id)
    .get(function(req, res) {
        requestHandler.handleGetWithID(req, res);
    })

    // update the danhngon with this id (accessed at PUT http://localhost:8080/api/danhngon/:danhngon_id)
    .put(function(req, res) {
        requestHandler.handlePut(req, res);
    })

    // delete the danhngon with this id (accessed at DELETE http://localhost:8080/api/danhngon/:danhngon_id)
    .delete(function(req, res) {
        requestHandler.handleDelete(req, res);
    });

// on routes that end in /danhngon/:danhngon_id/:translatedlanguage
// ----------------------------------------------------
router.route('/danhngon/:danhngon_id/:translatedlanguage')

    // get the danhngon with that id
    // (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id/:translatedlanguage)
    .get(function(req, res) {
        requestHandler.handleGetWithIDAndLang(req, res);
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
