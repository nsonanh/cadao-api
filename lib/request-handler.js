// request-handler.js
// ========

// Get required modules
var mongoose        = require('mongoose');
var translate       = require('./translate');
var Danhngon        = require('../app/models/danhngon');

mongoose.connect('mongodb://admin:admin@ds030500.mlab.com:30500/danhngon-api'); //connect to database


var handlePost = function(req, res) {
    var danhngon = new Danhngon();  // create a new instance of the Danhngon model
    var bodyContent = req.body;
    danhngon.content = bodyContent.content;  // set the danhngon content (comes from the request)
    danhngon.author = bodyContent.author;
    danhngon.language = bodyContent.language;
    // save the danhngon and check for errors
    danhngon.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Danhngon created!' });
    });
}

var handlePut = function(req, res) {
    // use our danhngon model to find the danhngon we want
    Danhngon.findById(req.params.danhngon_id, function(err, danhngon) {
        if (err)
            res.send(err);
        danhngon.content = req.body.content;  // update the danhngon content
        danhngon.author = req.body.author; // update the danhngon author
        danhngon.language = req.body.language; // update the danhngon language

        // save the danhngon
        danhngon.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'danhngon updated!' });
        });
    });
}

var handleDelete = function(req, res) {
    Danhngon.remove({
        _id: req.params.danhngon_id
    }, function(err, danhngon) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}

var handleGet = function(req, res) {
    Danhngon.find(function(err, danhngon) {
        if (err)
            res.send(err);

        res.json(danhngon);
    });
}

var handleGetRandom = function(req, res) {
    Danhngon.count().exec(function(err, count) {
        var random = Math.floor(Math.random() * count);

        Danhngon.findOne().skip(random).exec(
            function (err, danhngon) {
                if (err) {
                    res.send(err);
                }
                res.json(danhngon);
        });
    });
}

var handleGetRandomWithLang = function(req, res) {
    var lang = req.params.translatedlanguage;
    Danhngon.count().exec(function(err, count) {
        var random = Math.floor(Math.random() * count);
        Danhngon.findOne().skip(random).exec(function (err, danhngon) {
            if (err) {
                res.send(err);
            } else if (!lang) {
                res.json(danhngon);
            } else {
                translate.processWithTranslation(danhngon, lang, req, res);
            }
        });
    });
}

var handleGetWithID =  function(req, res) {
    Danhngon.findById(req.params.danhngon_id, function(err, danhngon) {
        if (err)
            res.send(err);
        res.json(danhngon);
    });
}

var handleGetWithIDAndLang = function(req, res) {
    var lang = req.params.translatedlanguage;
    Danhngon.findById(req.params.danhngon_id).exec(function (err, danhngon) {
        if (err) {
            res.send(err);
        } else if (!lang) {
            res.json(danhngon);
        } else {
            translate.processWithTranslation(danhngon, lang, req, res);
        }
    });
}

module.exports = {
  handlePost: handlePost,
  handlePut: handlePut,
  handleDelete: handleDelete,
  handleGet: handleGet,
  handleGetRandom: handleGetRandom,
  handleGetRandomWithLang: handleGetRandomWithLang,
  handleGetWithID: handleGetWithID,
  handleGetWithIDAndLang: handleGetWithIDAndLang
};