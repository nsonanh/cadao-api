let express             = require('express');           // call express
let router              = express.Router();             // get an instance of the express Router
let userRequestHandler  = require('../../lib/user-request-handler');
let verifyToken         = require('./verify-token');

// on routes that end in /api/user
// ----------------------------------------------------
// route to return all users (GET http://localhost:8080/api/users)
router.route('/')
    .get(verifyToken, function(req, res) {
        userRequestHandler.handleGet(req, res);
    });

// on routes that end in /api/user/authenticate
// ----------------------------------------------------
// route to authenticate users (GET http://localhost:8080/api/users)
router.route('/authenticate')
    .post(function(req, res) {
        userRequestHandler.handleAuthentication(req, res);
    });

module.exports = router;