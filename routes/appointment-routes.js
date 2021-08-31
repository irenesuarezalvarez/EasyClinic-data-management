const express = require("express");
const router = express.Router();

const Appointments = require('../models/Appointment.model');
const Professional = require('../models/Professional.model');


//Create new Appointment
router.post('/', (req, res, next) => {
    const { subject, startTime, endTime, professional } = req.body;
    Appointments.create({ subject, startTime, endTime, professional })
        .then((appointmentFromDb) => {
            return Professional.findByIdAndUpdate( professional, { $push: { appointment: appointmentFromDb._id } });
        }) 
        .then(() =>{
            console.log('New appointment was created in the backend')
            return res.status(200).json(professional);
        })
        .catch(error => console.log(`Error while creating a new appointment:`, error));
})

module.exports = router;