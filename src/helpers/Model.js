const mongoose = require('mongoose');
const multer = require('multer');
const Schema  = mongoose.Schema;
const dataset = new Schema({
    name: String,
    file: String
});

const file = mongoose.model('file', dataset);
module.exports = file;