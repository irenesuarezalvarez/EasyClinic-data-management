const express = require("express");
const router = express.Router();

const Appointment = require('../models/Appointment.model');
const Professional = require('../models/Professional.model');


//Create new Appointment
router.post('/', (req, res, next) => {
    const { subject, startTime, endTime, professional } = req.body;
    Appointment.create({ subject, startTime, endTime, professional })
        .then((appointmentFromDb) => {
            Professional.findByIdAndUpdate( professional, { $push: { appointment: appointmentFromDb._id } });
            console.log('New appointment was created in the backend', appointmentFromDb)
            return res.status(200).json(appointmentFromDb);
        }) 
        .catch(error => console.log(`Error while creating a new appointment:`, error));
})

module.exports = router;