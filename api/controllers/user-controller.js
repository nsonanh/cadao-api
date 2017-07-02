let express             = require('express');           // call express
let router              = express.Router();             // get an instance of the express Router
let userRequestHandler  = require('../../lib/user-request-handler');
let verifyToken         = require('./verify-token');

// on routes that end in /api/user
// ----------------------------------------------------
// route to return all users (GET http://localhost:8080/api/users)
router.route('/')

    // get all the user (accessed at GET http://localhost:8080/api/user)
    /**
     * @api {get} /api/user List all user
     * @apiHeader {String} x-access-token provided access token
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-access-token": "your token"
     *     }
     * @apiSuccess {Object[]} user user's list
     * @apiSuccess {Number} user._id user id
     * @apiSuccess {String} user.username user username
     * @apiSuccess {String} user.password user password
     * @apiSuccess {Boolean} user.admin user is admin ?
     * @apiSuccess {Date} user.created_at Register's date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "_id": 594634907c371c3e209e3446,
     *      "username": "testUser",
     *      "password": "$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe",
     *      "admin": false,
     *      "created_at": "2017-06-18T08:06:40.926Z"
     *    }]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(verifyToken, function(req, res) {
        userRequestHandler.handleGet(req, res);
    });

// on routes that end in /api/user/setup
// ----------------------------------------------------
router.route('/setup')
    .get(function(req, res) {
        userRequestHandler.setup(req, res);
    });

// on routes that end in /api/user/authenticate
// ----------------------------------------------------
// route to authenticate user (GET http://localhost:8080/api/user)
router.route('/authenticate')
    // create a token for user (accessed at POST http://localhost:8080/api/user/authenticate)
    /**
     * @api {post} /api/user/authenticate Register a token
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} username user's username
     * @apiParam {String} password user password
     * @apiParamExample {json} Input
     *    {
     *      "username": "testUser",
     *      "password": "password"
     *    }
     * @apiSuccess {Boolean} success true
     * @apiSuccess {String} message Enjoy your token!
     * @apiSuccess {String} token json web token
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "success": true,
     *      "message": "Enjoy your token!",
     *      "token": "$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe"
     *    }
     * @apiErrorExample {json} Register error
     *    HTTP/1.1 500 Internal Server Error
     */
    .post(function(req, res) {
        userRequestHandler.handleAuthentication(req, res);
    });

module.exports = router;