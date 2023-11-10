const mongoose = require('mongoose');
const Products = require('./products');

const orderSchema = new mongoose.Schema({
    _id : { type: Number, required: true},
    total : { type: String, required: true},
    products : [Products]
});

const Orders = mongoose.model('Orders', productSchema)

module.exports = Orders;