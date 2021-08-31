const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    subject: String,
    startTime: String,
    endTime: String,
    professional: [{ type: Schema.Types.ObjectId, ref: 'Professional' }],
});


module.exports = mongoose.model('Appointments', appointmentSchema);
