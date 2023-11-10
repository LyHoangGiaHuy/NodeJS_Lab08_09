const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id : { type: Number, required: true},
    name : { type: String, required: true},
    img : { data: Buffer, contentType: String },
    desc: { type: String }
});

const Products = mongoose.model('Products', productSchema)

module.exports = Products;