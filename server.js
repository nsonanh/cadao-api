// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/danhngon-db'); //connect to database

var Danhngon = require('./app/models/danhngon');

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

        var danhngon = new Danhngon();  // create a new instance of the Danhngon model
        danhngon.content = req.body.content;  // set the danhngon content (comes from the request)

        // save the danhngon and check for errors
        danhngon.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Danhngon created!' });
        });

    })

    // get all the danhngon (accessed at GET http://localhost:8080/api/danhngon)
    .get(function(req, res) {
        Danhngon.find(function(err, danhngon) {
            if (err)
                res.send(err);

            res.json(danhngon);
        });
    });

// on routes that end in /danhngon/random
// ----------------------------------------------------
router.route('/danhngon/random')

    // get the random danhngon (accessed at GET http://localhost:8080/api/danhngon/random)
    .get(function(req, res) {
        Danhngon.count().exec(function(err, count){

            var random = Math.floor(Math.random() * count);

            Danhngon.findOne().skip(random).exec(
                function (err, danhngon) {
                    if (err)
                        res.send(err);

                    res.json(danhngon);
                });
        });
    });

// on routes that end in /danhngon/:danhngon_id
// ----------------------------------------------------
router.route('/danhngon/:danhngon_id')

    // get the danhngon with that id (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id)
    .get(function(req, res) {
        Danhngon.findById(req.params.danhngon_id, function(err, danhngon) {
            if (err)
                res.send(err);
            res.json(danhngon);
        });
    })

    // update the danhngon with this id (accessed at PUT http://localhost:8080/api/danhngon/:danhngon_id)
    .put(function(req, res) {

        // use our danhngon model to find the danhngon we want
        Danhngon.findById(req.params.danhngon_id, function(err, danhngon) {

            if (err)
                res.send(err);

            danhngon.content = req.body.content;  // update the danhngon info

            // save the danhngon
            danhngon.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'danhngon updated!' });
            });

        });
    })

    // delete the danhngon with this id (accessed at DELETE http://localhost:8080/api/danhngon/:danhngon_id)
    .delete(function(req, res) {
        Danhngon.remove({
            _id: req.params.danhngon_id
        }, function(err, danhngon) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
