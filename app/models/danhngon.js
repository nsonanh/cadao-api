// app/models/danhngon.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DanhngonSchema   = new Schema({
    content: String
});

module.exports = mongoose.model('Danhngon', DanhngonSchema);

