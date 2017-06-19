// input-validator.js
// ========

var validateID = function(req, res) {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(req.params.danhngon_id)) {
        res.status(404)        // HTTP status 404: NotFound
            .send('Invalid input, please enter valid _id.');
        return false;
    }
    return true;
}

var validateParams = function(req, res) {
    if (!req.body.content || !req.body.author || !req.body.language) {
        res.status(404)        // HTTP status 404: NotFound
            .send('Invalid input, please enter params: content, author and original language.');
        return false;
    }
    return true;
}

var validateLangParam = function(req, res) {
    var lang = req.params.translatedlanguage;
    if (lang !== 'auto') {
        var checkForHexRegExp = new RegExp("^[a-zA-Z]{2}$");
        if (!checkForHexRegExp.test(lang)) {
            res.status(404)        // HTTP status 404: NotFound
                .send('Invalid input, please enter valid language ISO code.');
            return false;
        }
    }
    return true;
}

// declare function for this module
module.exports = {
    validateID: validateID,
    validateParams: validateParams,
    validateLangParam: validateLangParam
};