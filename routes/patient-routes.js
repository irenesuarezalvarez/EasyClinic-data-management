const express = require("express");
const router = express.Router();

const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model');
//CREATE DATA ROUTE
router.post('/create', (req, res, next) => {
    const { name, surname, email, phone, address, city, state, postal, contactname, contactsurname, contactemail, contactphone, professional, history } = req.body;
 
    Patient.create({ name, surname, email, phone, address, city, state, postal, contactname, contactsurname, contactemail, contactphone, professional, history })
        .then((patientsFromDb) => {
        return Professional.findByIdAndUpdate( professional, { $push: { patients: patientsFromDb._id } });
        }) 
        .then(() =>{
            console.log('New patient created in the backend')
            res.status(200).json(professional);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})

//SEND DATA LIST OF PATIENTS

router.get('/', (req, res, next) => {
    console.log('PATIENTS API REQ SESS',req.session)
    Professional.find()
        .then((professionalsFromDb) =>{
            res.status(200).json(professionalsFromDb);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})
module.exports = router;