// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
let express     = require('express');        // call express
let app         = express();                 // define our app using express
let bodyParser  = require('body-parser');
let morgan      = require('morgan');
let config      = require('config'); //we load the db location from the JSON files

// Serving static files from "public" folder
app.use(express.static('public'));

// CALL LOCAL LIBRARIES
// call lang to get accepted language from request
let requestHandler  = require('./lib/request-handler')

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

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
    /**
     * @api {post} /api/danhngon Register a new danhngon
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {String} content danhngon content
     * @apiParam {String} author danhngon author
     * @apiParam {String} language danhngon language
     * @apiParamExample {json} Input
     *    {
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en"
     *    }
     * @apiSuccess {Number} _id danhngon id
     * @apiSuccess {String} content danhngon content
     * @apiSuccess {String} author danhngon author
     * @apiSuccess {String} language danhngon language
     * @apiSuccess {Date} created_at Register date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} Register error
     *    HTTP/1.1 500 Internal Server Error
     */
    .post(function(req, res) {
        requestHandler.handlePost(req, res);
    })

    // get all the danhngon (accessed at GET http://localhost:8080/api/danhngon)
    /**
     * @api {get} /api/danhngon List all danhngon
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiSuccess {Object[]} danhngon Danhngon's list
     * @apiSuccess {Number} danhngon._id danhngon id
     * @apiSuccess {String} danhngon.content danhngon content
     * @apiSuccess {String} danhngon.author danhngon author
     * @apiSuccess {String} danhngon.language danhngon language
     * @apiSuccess {Date} danhngon.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(function(req, res) {
        requestHandler.handleGet(req, res);
    });

// on routes that end in /danhngon/random
// ----------------------------------------------------
router.route('/danhngon/random')

    // get the random danhngon (accessed at GET http://localhost:8080/api/danhngon/random)
    /**
     * @api {get} /api/danhngon/random Find a random danhngon
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiSuccess {Number} danhngon._id danhngon id
     * @apiSuccess {String} danhngon.content danhngon content
     * @apiSuccess {String} danhngon.author danhngon author
     * @apiSuccess {String} danhngon.language danhngon language
     * @apiSuccess {Date} danhngon.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} danhngon not found
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: can't find random danhngon."
     *    }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(function(req, res) {
        requestHandler.handleGetRandom(req, res);
    });

// on routes that end in /danhngon/random/:tramslatedLanguage
// ----------------------------------------------------
router.route('/danhngon/random/:language')

    // get the random translated danhngon (accessed at GET http://localhost:8080/api/danhngon/random)
    /**
     * @api {get} /api/danhngon/random/:language Find a random translated danhngon
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {String} language language to translate to (in ISO code e.g. "vi"). If "auto", browser's language will be used.
     * @apiSuccess {Number} danhngon._id danhngon id
     * @apiSuccess {String} danhngon.content danhngon content
     * @apiSuccess {String} danhngon.author danhngon author
     * @apiSuccess {String} danhngon.language danhngon language
     * @apiSuccess {Date} danhngon.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "Một nụ cười là sự chào đón phổ quát.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} cannot translate danhngon
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: cannot translate with language code: :language."
     *    }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(function(req, res) {
        requestHandler.handleGetRandomWithLang(req, res);
    });

// on routes that end in /danhngon/:language
// ----------------------------------------------------
router.route('/danhngon/language/:language')

    // get the danhngon with that language (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id)
    /**
     * @api {get} /api/danhngon/:language Find a danhngon with language
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {String} language danhngon language (in ISO code)
     * @apiSuccess {Number} danhngon._id danhngon id
     * @apiSuccess {String} danhngon.content danhngon content
     * @apiSuccess {String} danhngon.author danhngon author
     * @apiSuccess {String} danhngon.language danhngon language
     * @apiSuccess {Date} danhngon.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} danhngon not found
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: can't find danhngon by language."
     *    }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(function(req, res) {
        requestHandler.handleGetWithLanguage(req, res);
    })

// on routes that end in /danhngon/:danhngon_id
// ----------------------------------------------------
router.route('/danhngon/:danhngon_id')

    // get the danhngon with that id (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id)
    /**
     * @api {get} /api/danhngon/:id Find a danhngon with id
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {Number} _id danhngon id
     * @apiSuccess {Number} danhngon._id danhngon id
     * @apiSuccess {String} danhngon.content danhngon content
     * @apiSuccess {String} danhngon.author danhngon author
     * @apiSuccess {String} danhngon.language danhngon language
     * @apiSuccess {Date} danhngon.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} danhngon not found
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: can't find danhngon by id."
     *    }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(function(req, res) {
        requestHandler.handleGetWithID(req, res);
    })

    // update the danhngon with this id (accessed at PUT http://localhost:8080/api/danhngon/:danhngon_id)
    /**
     * @api {put} /api/danhngon/:id Update a danhngon
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {id} _id danhngon id
     * @apiParam {String} content danhngon content
     * @apiParam {String} author danhngon author
     * @apiParam {String} language danhngon language
     * @apiParamExample {json} Input
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en"
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "A smile is the universal welcome.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} lack param
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "Invalid input, please enter params: content, author and original language."
     *    }
     * @apiErrorExample {json} danhngon not found
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: can't find danhngon by id."
     *    }
     * @apiErrorExample {json} Register error
     *    HTTP/1.1 500 Internal Server Error
     */
    .put(function(req, res) {
        requestHandler.handlePut(req, res);
    })

    // delete the danhngon with this id (accessed at DELETE http://localhost:8080/api/danhngon/:danhngon_id)
    /**
     * @api {delete} /api/danhngon/:id Remove a danhngon
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {id} _id danhngon id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "danhngon successfully deleted!"
     *    }
     * @apiErrorExample {json} danhngon not found
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: can't find danhngon by id."
     *    }
     * @apiErrorExample {json} Delete error
     *    HTTP/1.1 500 Internal Server Error
     */
    .delete(function(req, res) {
        requestHandler.handleDelete(req, res);
    });

// on routes that end in /danhngon/:danhngon_id/:language
// ----------------------------------------------------
router.route('/danhngon/:danhngon_id/:language')

    // get the danhngon with that id
    // (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id/:language)
    // get the translated danhngon (accessed at GET http://localhost:8080/api/danhngon/:danhngon_id/:language)
    /**
     * @api {get} /api/danhngon/:danhngon_id/:language Find a translated danhngon with id
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {Number} id danhngon id
     * @apiParam {String} language language to translate to (in ISO code e.g. "vi"). If "auto", browser's language will be used.
     * @apiSuccess {Number} danhngon._id danhngon id
     * @apiSuccess {String} danhngon.content danhngon content
     * @apiSuccess {String} danhngon.author danhngon author
     * @apiSuccess {String} danhngon.language danhngon language
     * @apiSuccess {Date} danhngon.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id": 594634907c371c3e209e3446,
     *      "content": "Một nụ cười là sự chào đón phổ quát.",
     *      "author": "Max Eastman",
     *      "language": "en",
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }
     * @apiErrorExample {json} danhngon not found
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: can't find danhngon by id."
     *    }
     * @apiErrorExample {json} cannot translate danhngon
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "error: cannot translate with language code: :language."
     *    }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */
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

// For tests
module.exports = app;