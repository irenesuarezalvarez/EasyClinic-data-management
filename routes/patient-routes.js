const express = require("express");
const router = express.Router();

const fileUploader = require('../config/cloudinary.config');//for cloudinary

const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model');

//Create new Patient
router.post('/create', (req, res, next) => {
    console.log('backend create clou')
    const { media, name, surname, email, phone, address, city, state, postal, contactname, contactsurname, contactemail, contactphone, professional, history } = req.body;
    Patient.create({ media, name, surname, email, phone, address, city, state, postal, contactname, contactsurname, contactemail, contactphone, professional, history })
        .then((patientsFromDb) => {
            Professional.findByIdAndUpdate( professional, { $push: { patients: patientsFromDb._id } });
            return res.status(200)
        }) 
        .then(() =>{
            console.log('New patient created in the backend')
            return res.status(200).json(professional);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})


//Send all patients from the db to the frontend
router.get('/all', (req, res, next) => {
    Patient.find()
        .then((patientsFromDb) =>{
            return res.status(200).json(patientsFromDb);
        })
        .catch(error => console.log(`Error while searching a new patient:`, error));
})

//Send patients from one professional from the db to the frontend
router.get('/mypatients', (req, res, next) => {
    const id  =  req.session.user._id;
    Professional.findById(id)
        .populate('patients')
        .then((patientsFromDb) =>{
            return res.status(200).json(patientsFromDb);
        })
        .catch(error => console.log(`Error while creating a new patient:`, error));
})

//Edit Patient
router.get('/edit/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findById(id)
            .populate("professional") 
            .then((patientToEdit) =>{
            return res.status(200).json(patientToEdit);
        })
        .catch(error => console.log(`Error while trying to edit a new patient:`, error));
})

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params;
    console.log('que llega?', req.body)

    Patient.findByIdAndUpdate(id, req.body , { new : true })
        .then((data) =>{
            console.log("Here is the data", data);
            return res.status(200).json(data);
        })
        .catch(error => console.log(error));
})

//Delete Patient
router.delete('/all/:id/:professional', async (req, res, next) => {
    const { id, professional } = req.params;
    try{
        const patientArray = await Professional.findByIdAndUpdate(professional, {
            $pull: {patients: id}
        });
        const deletePatient = await Patient.findByIdAndDelete(id)
        return res.status(200).json('patient deleted')
    }
    catch(error){
        next(error)
    } 
    
})

//Search
router.post('/search', (req, res, next) => {
    const { id } = req.params;
    Patient.find( req.body )
            .then((data) =>{
            return res.status(200).json(data);
        })
        .catch(error => console.log(`Error while trying to search for a patient:`, error));
})


module.exports = router;