// app/models/danhngon.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DanhngonSchema   = new Schema({
    content:    { type: String, required: true },
    author:     { type: String, required: true },
    language:   { type: String, required: true },
    createdAt:  { type: Date, default: Date.now }
},
{
    collection: 'Danhngon',
    versionKey: false
});

//// Sets the createdAt parameter equal to the current time
DanhngonSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Danhngon', DanhngonSchema);