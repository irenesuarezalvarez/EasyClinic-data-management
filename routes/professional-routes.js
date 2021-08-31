const express = require("express");
const router = express.Router();

const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model');

//Send professionals from the db to the front end
router.get('/', (req, res, next) => {
    Professional.find()
        .then((professionalsFromDb) =>{
            return res.status(200).json(professionalsFromDb);
        })
        .catch(error => console.log(`Error while searching for professionals:`, error));
})

module.exports = router;