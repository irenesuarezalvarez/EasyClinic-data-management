const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    media: String,
    name: String,
    surname: String,
    email: String,
    phone: Number,
    address: String,
    city: String,
    state: String,
    postal: Number,
    contactname: String,
    contactsurname: String,
    contactemail: String,
    contactphone: Number,
    professional: [{ type: Schema.Types.ObjectId, ref: 'Professional' }],
    history:  [{ type: Schema.Types.ObjectId, ref: 'History' }],
});

module.exports = mongoose.model('Patient', patientSchema);
