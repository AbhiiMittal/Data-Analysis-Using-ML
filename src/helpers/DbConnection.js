const express = require('express'); 
const mongoose = require('mongoose');
const multer = require('multer');

require('dotenv').config();
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/saveFile");

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;