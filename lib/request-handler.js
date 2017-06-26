// request-handler.js
// ========

// Get required modules
let mongoose        = require('mongoose');
let translate       = require('./translate');
let Danhngon        = require('../app/models/danhngon');
let inputValidator  = require('./input-validator');
let config          = require('config'); //we load the db location from the JSON files

//db options
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };

//db connection
mongoose.connect(config.DBHost, options);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var handlePost = function(req, res) {
    var newDanhngon = new Danhngon(req.body);
    // save the danhngon and check for errors
    if (inputValidator.validateParams(req, res)) {
        newDanhngon.save(function(err, danhngon) {
            if (err) {
                res.json({ message: 'error: ', err });
            } else {
                res.json({ message: 'danhngon created!', danhngon });
            }
        });
    }
}

var handlePut = function(req, res) {
    if (inputValidator.validateParams(req, res)) {
        if (inputValidator.validateID(req, res)) {
            // use our danhngon model to find the danhngon we want
            Danhngon.findById(req.params.danhngon_id, function(err, danhngon) {
                if (err) {
                    res.json({ message: 'error: ', err });
                } else if (!danhngon) {
                    res.json({ message: "error: can't find danhngon by id." });
                } else {
                    // save the danhngon
                    Object.assign(danhngon, req.body).save((err, danhngon) => {
                        if(err) {
                            res.json({ message: 'error: ', err });
                        } else {
                            res.json({ message: 'danhngon updated!', danhngon });
                        }
                    });
                }
            });
        }
    }
}

var handleDelete = function(req, res) {
    if (inputValidator.validateID(req, res)) {
        Danhngon.remove({
            _id: req.params.danhngon_id
        }, function(err, danhngon) {
            if (err) {
                res.json({ message: 'error: ', err });
            } else {
                res.json({ message: 'danhngon successfully deleted!' });
            }
        });
    }
}

var handleGet = function(req, res) {
    Danhngon.find(function(err, danhngon) {
        if (err) {
            res.json({ message: 'error: ', err });
        } else {
            res.json(danhngon);
        }
    });
}

var handleGetRandom = function(req, res) {
    Danhngon.count().exec(function(err, count) {
        var random = Math.floor(Math.random() * count);

        Danhngon.findOne().skip(random).exec(
            function (err, danhngon) {
                if (err) {
                    res.json({ message: 'error: ', err });
                } else {
                    res.json(danhngon);
                }
        });
    });
}

var handleGetRandomWithLang = function(req, res) {
    var lang = req.params.language;
    Danhngon.count().exec(function(err, count) {
        var random = Math.floor(Math.random() * count);
        Danhngon.findOne().skip(random).exec(function (err, danhngon) {
            if (err) {
                res.json({ message: 'error: ', err });
            } else if (!lang) {
                res.json(danhngon);
            } else if (inputValidator.validateLangParam(req, res)) {
                translate.processWithTranslation(danhngon, lang, req, res);
            }
        });
    });
}

var handleGetWithID =  function(req, res) {
    if (inputValidator.validateID(req, res)) {
        Danhngon.findById(req.params.danhngon_id, function(err, danhngon) {
            if (err) {
                res.json({ message: 'error: ', err });
            } else if (!danhngon) {
                res.json({ message: "error: can't find danhngon by id." });
            } else {
                res.json(danhngon);
            }
        });
    }
}

var handleGetWithIDAndLang = function(req, res) {
    if (inputValidator.validateID(req, res)) {
        var lang = req.params.language;
        Danhngon.findById(req.params.danhngon_id).exec(function (err, danhngon) {
            if (err) {
                res.json({ message: 'error: ', err });
            } else if (!danhngon) {
                res.json({ message: "error: can't find danhngon by id." });
            } else if (!lang) {
                res.json(danhngon);
            } else if (inputValidator.validateLangParam(req, res)) {
                translate.processWithTranslation(danhngon, lang, req, res);
            }
        });
    }
}

var handleGetWithLanguage = function(req, res) {
    if (inputValidator.validateLangParam(req, res)) {
        var lang = req.params.language;
        Danhngon.find({ language: lang }, function (err, danhngon) {
            if (err) {
                res.json({ message: 'error: ', err });
            }else if (!danhngon) {
                res.json({ message: "error: can't find danhngon by language." });
            } else {
                res.json(danhngon);
            }
        });
    }
}

module.exports = {
  handlePost: handlePost,
  handlePut: handlePut,
  handleDelete: handleDelete,
  handleGet: handleGet,
  handleGetRandom: handleGetRandom,
  handleGetRandomWithLang: handleGetRandomWithLang,
  handleGetWithID: handleGetWithID,
  handleGetWithIDAndLang: handleGetWithIDAndLang,
  handleGetWithLanguage: handleGetWithLanguage
};