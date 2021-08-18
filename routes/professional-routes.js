const express = require("express");
const router = express.Router();

const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model');
//CREATE DATA ROUTE
router.get('/', (req, res, next) => {
    Professional.find()
        .then((professionalsFromDb) =>{
            res.status(200).json(professionalsFromDb);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})

module.exports = router;