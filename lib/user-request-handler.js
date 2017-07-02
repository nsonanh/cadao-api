// user-request-handler.js
// ========

// Get required modules
let mongoose        = require('mongoose');
let User            = require('../api/models/user');
let jwt             = require('jsonwebtoken');  // used to create, sign, and verify tokens
let inputValidator  = require('./input-validator');
let config          = require('config'); //we load the db location from the JSON files
let secret          = require('../api/secret');

var setup = function(req, res) {
    // create a sample user
    var nick = new User({
        username: 'Son Nguyen',
        password: 'password',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
}

var handleGet = function(req, res) {
    User.find(function(err, user) {
        if (err) {
            res.json({ message: 'error: ', err });
        } else {
            res.json(user);
        }
    });
}

var handleAuthentication = function(req, res) {
    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.comparePassword(req.body.password, function(err, isMatch) {

                if (err) throw err;

                if (!isMatch) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, secret, {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            });
        }
    });
}

module.exports = {
    setup: setup,
    handleGet: handleGet,
    handleAuthentication: handleAuthentication
};