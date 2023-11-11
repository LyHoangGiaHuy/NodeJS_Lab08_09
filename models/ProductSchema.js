const mongoose = require('mongoose');
const Counter = require('./CounterSchema');

const productSchema = new mongoose.Schema({
    _id : { type: Number, required: true, unique: true },
    name : { type: String, required: true },
    img : { data: Buffer, contentType: String },
    desc: { type: String },
});

// Auto increment
productSchema.pre('save', async function() {
    const doc = this;
    const counter = await Counter.findByIdAndUpdate(
        { _id: '_id' },
        { $inc: { seq_value: 1 } },
        { new: true, upsert: true },
    );
    doc._id = counter.seq_value;
});

const Products = mongoose.model('Products', productSchema)

module.exports = Products;