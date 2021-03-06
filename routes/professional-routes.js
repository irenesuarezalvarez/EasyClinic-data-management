const express = require("express");
const router = express.Router();

const Professional = require('../models/Professional.model');
const Appointment = require('../models/Appointment.model')

//Send professionals from the db to the front end
router.get('/', (req, res, next) => {
    Professional.find()
        .then((professionalsFromDb) =>{
            return res.status(200).json(professionalsFromDb);
        })
        .catch(error => console.log(`Error while searching for professionals:`, error));
})

router.get('/app', (req, res, next) => {
    Appointment.find()
        .then((appFromDb) =>{
            return res.status(200).json(appFromDb);
        })
        .catch(error => console.log(`Error while searching for professionals:`, error));
})

module.exports = router;