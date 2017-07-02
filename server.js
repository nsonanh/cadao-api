// =============================================================================
// server.js
// =============================================================================

// =============================================================================
// BASE SETUP
// =============================================================================

// call the packages we need
let express     = require('express');       // call express
let app         = express();                // define our app using express
let cors        = require('./lib/cors');    // enable CORS
let bodyParser  = require('body-parser');   // body parser
let morgan      = require('morgan');        // tomcat styled log
let config      = require('config');        // we load the db location from the JSON files

// Serving static files from "public" folder
app.use(express.static('public'));

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

// =============================================================================
// ROUTES FOR OUR API
// =============================================================================

// get an instance of the express Router
let router = express.Router(); 

// middleware to use for all requests - default: enable cors for GET
router.use(cors());

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// For each specific resource in api, handle in a controller
router.use('/danhngon', require('./api/controllers/danhngon-controller'));
router.use('/user',     require('./api/controllers/user-controller'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// For tests
module.exports = app;