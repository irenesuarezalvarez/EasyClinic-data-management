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
            return res.status(200).json(history);
        })
        .catch(error => console.log(`Error while accessing patient history:`, error));
})

//Create Session
router.post('/history/create', (req, res, next) => {
    const { date, notes, content, patient } = req.body;
    History.create({date, notes, content, patient})
        .then((session) => {
        return Patient.findByIdAndUpdate( patient, { $push: { history: session._id } });
        
    }) 
    .then(() =>{
        console.log('New session was saved to patient: ', patient)
        return res.status(200).json('New sessopm was saved');
    })
    .catch(error => console.log(`Error while saving the session:`, error));
   
})

<<<<<<< HEAD
//Delte
router.delete('/history/:id/:patient', async (req, res, next) => {
    const { id } = req.params;
   
=======
//Delete
router.delete('/history/:id/:patient', async (req, res, next) => {
    const { id, patient } = req.params;
  
>>>>>>> 19ea4e9668848f430ccec3753cf089c905b2c16c
    try{
        const historyArray = await Patient.findByIdAndUpdate(patient, {
            $pull: {history: id}
<<<<<<< HEAD
        });  */
=======
        }); 
>>>>>>> 19ea4e9668848f430ccec3753cf089c905b2c16c
        const deleteSession = await History.findByIdAndDelete(id)
        return res.status(200).json('session deleted')
    }
    catch(error){
        next(error)
    } 
 })

module.exports = router;