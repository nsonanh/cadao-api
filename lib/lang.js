// lang.js
// ========
module.exports = {
  getAcceptedLanguage: function (req) {
    var langs = req.headers["accept-language"];
    var lang = langs.substring(0, 2);
    return lang;
  }
};