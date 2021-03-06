const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    date: String,
    notes: String,
    content: String,
    patient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
});


module.exports = mongoose.model('History', historySchema);
