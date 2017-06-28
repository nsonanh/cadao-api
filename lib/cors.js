// cors.js

module.exports = function() {
    return function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // do logging
        console.log('Received request...');
        next(); // make sure we go to the next routes and don't stop here
    };
}
