let express         = require('express');       // call express
let router          = express.Router();              // get an instance of the express Router
let requestHandler  = require('../../lib/danhngon-request-handler');
let verifyToken     = require('./verify-token');

// on routes that end in /danhngon
// ----------------------------------------------------
router.route('/')
    // create a danhngon (accessed at POST http://localhost:8080/api/danhngon)
    /**
     * @api {post} /api/danhngon Register a new danhngon
     * @apiHeader {String} x-access-token provided access token
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {String} content danhngon content
     * @apiParam {String} author danhngon author
     * @apiParam {String} language danhngon language
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-access-token": "your token"
     *     }
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
    .post(verifyToken, function(req, res) {
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
router.route('/random')

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
router.route('/random/:language')

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

// on routes that end in /danhngon/language/:language
// ----------------------------------------------------
router.route('/language/:language')

    // get the danhngon with that language (accessed at GET http://localhost:8080/api/danhngon/language/:language)
    /**
     * @api {get} /api/danhngon/language/:language Find all danhngon with original language
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {String} language danhngon language (in ISO code. If "auto", browser's language will be used.)
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

// on routes that end in /danhngon/author/:author
// ----------------------------------------------------
router.route('/author/:author')

    // get the danhngon with that author (accessed at GET http://localhost:8080/api/danhngon/author/:author)
    /**
     * @api {get} /api/danhngon/author/:author Find all danhngon with author
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {String} author danhngon author
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
     *      "message": "error: can't find danhngon from author."
     *    }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */
    .get(function(req, res) {
        requestHandler.handleGetWithAuthor(req, res);
    })

// on routes that end in /danhngon/:danhngon_id
// ----------------------------------------------------
router.route('/:danhngon_id')

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
     * @apiHeader {String} x-access-token provided access token
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {id} _id danhngon id
     * @apiParam {String} content danhngon content
     * @apiParam {String} author danhngon author
     * @apiParam {String} language danhngon language
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-access-token": "your token"
     *     }
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
    .put(verifyToken, function(req, res) {
        requestHandler.handlePut(req, res);
    })

    // delete the danhngon with this id (accessed at DELETE http://localhost:8080/api/danhngon/:danhngon_id)
    /**
     * @api {delete} /api/danhngon/:id Remove a danhngon
     * @apiHeader {String} x-access-token provided access token
     * @apiVersion 1.0.0
     * @apiGroup Danhngon
     * @apiParam {id} _id danhngon id
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-access-token": "your token"
     *     }
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
    .delete(verifyToken, function(req, res) {
        requestHandler.handleDelete(req, res);
    });

// on routes that end in /danhngon/:danhngon_id/:language
// ----------------------------------------------------
router.route('/:danhngon_id/:language')

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

module.exports = router;