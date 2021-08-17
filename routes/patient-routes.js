const express = require("express");
const router = express.Router();

const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model');

//CREATE DATA ROUTE
router.post('/create', (req, res, next) => {
    const { name, surname, email, phone, address, city, state, postal, contactname, contactsurname, contactemail, contactphone, professional, history } = req.body;
    console.log('Create req sess', req.session)
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
//ALL PATIENTS
router.get('/all', (req, res, next) => {
    Patient.find()
        .then((patientsFromDb) =>{
            res.status(200).json(patientsFromDb);
        })
        .catch(error => console.log(`Error while searching a new patient:`, error));
})

//ALL PATIENTS FROM ONE PROFESSIONAL - should I populate patients?
router.get('/mypatients', (req, res, next) => {
    console.log('PATIENTS API REQ SESS',req.session)
    Professional.find()
        .populate('patients')
        .then((patientsFromDb) =>{
            res.status(200).json(patientsFromDb);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})

//DELETE PATIENT
router.delete('/all/:id', (req, res, next) => {
    const { id } = req.params;
    Professional.find()
        .populate('patients')
        .then(profs =>  {
                $pull: {patients : id}
        })
    Patient.findByIdAndDelete(id)
        .then((patientFromDb) =>{
            res.status(200).json(patientFromDb);
        })
        .catch(error => console.log(`Error while deleting the patient:`, error));
})
//Model from module 2, maybe usefull for later
/* router.delete('/:id/delete', async (req, res) => {
    const { id } = req.params;
    try{
      const patientArray = await Professional.findByIdAndUpdate(req.session.user._id, {
          $pull: { patients: id },
      });
      
      const deletePatient = await Patient.findByIdAndDelete(id)
      return res.redirect('/patients')
    }
    catch(error) {
      next(error)
    }
  }); */

module.exports = router;