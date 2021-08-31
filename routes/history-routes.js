const express = require("express");
const router = express.Router();

const History = require('../models/History.model');
const Patient = require('../models/Patient.model');


//Get history
router.get('/history/:id', (req, res, next) => {
    const {id}  =  req.params;
    Patient.findById(id)
        .populate('history')
        .then((history) =>{
            res.status(200).json(history);
        })
        .catch(error => console.log(`Error while accessing patient history:`, error));
})

//Create Session
router.post('/history/:id', (req, res, next) => {
    const patientId = req.params.id; 
    const { date, notes, content } = req.body;

    History.create({date, notes, content, patientId })
        .then((session) => {
        return Patient.findByIdAndUpdate( patientId, { $push: { history: session._id } });
    }) 
    .then(() =>{
        console.log('New session was saved to patient: ', patientId)
        res.status(200);
    })
    .catch(error => console.log(`Error while saving the session:`, error));
   
})

//Delte
router.delete('/history/:id/:patient', async (req, res, next) => {
    const { id } = req.params;
   
    try{
        /* const historyArray = await Patient.findByIdAndUpdate(patient._id, {
            $pull: {history: id}
        });  */
        const deleteSession = await History.findByIdAndDelete(id)
    }
    catch(error){
        next(error)
    }
 })

module.exports = router;