// translate.js
// ========

// call google-translate package
var googleCloudAPIKey = 'AIzaSyDUuOiaMSaelvdIckjV6CHVguHINuHAdmk';
var googleTranslate = require('google-translate')(googleCloudAPIKey);  // google-translate

// call local lang library
var langLibrary = require('./lang');

var processWithTranslation = function (danhngon, lang, req, res) {
    if (lang === "auto") {
        lang = langLibrary.getAcceptedLanguage(req);
    }
    if (lang === danhngon.language) {
        res.json(danhngon);
    } else {
        sendTranslation(danhngon, lang, req, res);
    }
}

var sendTranslation = function (danhngon, lang, req, res) {
    // get translation
    googleTranslate.translate(danhngon.content, danhngon.language, lang, function(err, translation) {
        if (err) {
            res.json({ message: "error: cannot translate with language code: " + lang });
        } else {
            danhngon.content = translation.translatedText;
            res.json(danhngon);
        }
    });
}

// declare function for this module
module.exports = {
    processWithTranslation: processWithTranslation
};