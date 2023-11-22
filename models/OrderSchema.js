const mongoose = require('mongoose');
const Products = require('./ProductSchema');
const { getNextSequenceValue } = require('./autoIncrement');

const orderSchema = new mongoose.Schema({
    id : { type: Number, unique: true },
    total_price : { type: String, required: true },
    products : [
        {   
            _id: false,
            code : { type: Number, required: true },
            name : { type: String, required: true },
            price: { type: Number, required: true },
            img : { type: String },
            desc: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
});

// Auto increment
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('Orders', 'id');
    }
    next();
});

const Orders = mongoose.model('Orders', orderSchema)

module.exports = Orders;