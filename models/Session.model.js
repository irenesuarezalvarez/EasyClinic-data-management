const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    date: String,
    notes: String,
    content: String,
    patient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
});


module.exports = mongoose.model('Session', sessionSchema);
