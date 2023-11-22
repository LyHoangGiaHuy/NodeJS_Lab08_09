// This Schema is for auto increment _id
const mongoose = require('mongoose');

const autoIncrementSchema = new mongoose.Schema({
    model: { type: String, required: true },
    field: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const AutoIncrement = mongoose.model('AutoIncrement', autoIncrementSchema);

async function getNextSequenceValue(modelName, fieldName) {
    const counter = await AutoIncrement.findOneAndUpdate(
      { model: modelName, field: fieldName },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return counter.count;
}

module.exports.getNextSequenceValue  = getNextSequenceValue;