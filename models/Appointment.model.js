const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    subject: String,
    startTime: Date,
    endTime: Date,
    professional: [{ type: Schema.Types.ObjectId, ref: 'Professional'}],
});


module.exports = mongoose.model('Appointment', appointmentSchema);
