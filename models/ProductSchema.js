const mongoose = require('mongoose');
const { getNextSequenceValue } = require('./autoIncrement');

const productSchema = new mongoose.Schema({
    code : { type: Number, unique: true },
    name : { type: String, required: true },
    price: { type: Number, required: true },
    img : { type: String },
    desc: { type: String }
});

// Auto increment
productSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.code = await getNextSequenceValue('Products', 'code');
    }
    next();
});

const Products = mongoose.model('Products', productSchema)

module.exports = Products;