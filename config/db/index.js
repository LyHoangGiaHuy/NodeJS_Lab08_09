const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/';
const db = 'shopifake';
const connection = mongoose.connect(`${url}${db}`).catch(err => console.log(err))

module.exports = connection;