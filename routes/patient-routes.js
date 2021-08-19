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
    Professional.find()
        .populate('patients')
        .then((patientsFromDb) =>{
            res.status(200).json(patientsFromDb);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})
//EDIT PATIENT

router.get('/edit/:id', (req, res, next) => {
    const { id } = req.params;
    console.log('PATIENT TO EDIT API', id)
    Patient.findById(id)
            .populate("professional") 
            .then((patientToEdit) =>{
            res.status(200).json(patientToEdit);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params;
    /* const {  name } = req.body; */
    Patient.findByIdAndUpdate(id, req.body , { new : true })
        .then((data) =>{
            console.log("Here is the data", data);
            res.status(200).json(data);
        })
        .catch(error => console.log(error));
})

//FROM MODULE 2
/* 
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    Patient.findById(id)
      .populate("professional")
      .then((patientToEdit) => {
        Professional.find()
        .then((professional) => {
          console.log('PATIENT TO EDIT routes', patientToEdit)
          res.render('patients/edit-patient', {patient : patientToEdit, professional})
        })
        .catch((err) => console.log(`Err while displaying post input page: ${err}`));
      })
      .catch(error => next(error));
  }); */
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

  //Sessions
  router.get('/sessions/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findById(id)
            .populate("history") 
            .then((sessions) =>{
            res.status(200).json(sessions);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})
module.exports = router;