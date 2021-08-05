const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const Professional = require('../models/Professional.model');

const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password ) {
      res.status(401).json({ errorMessage: 'All fields are mandatory. Please provide your username, role, email and password.' });
      return;
    }
   
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res
        .status(401)
        .json({ errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
      return;
    } 
   
    //Bcrypt
    const salt = bcrypt.genSaltSync(bcryptSalt); //genrate a salt
    const passwordHash = bcrypt.hashSync(password, salt); //user password = hashed password
    const newProf = new Professional({ username, email, passwordHash})
    newProf.save()
        .then((user)=> {
            res.status(200).json(user)
        })
        .catch((error)=> {
            console.log(error)
            res.status(400).json(error)
        })
  });

/* router("/over"((req, res)=>{
    User.find()
    .then(foundCards => res.json(foundCards))
}) */

//LOG-IN POST ROUTE
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === '' || password === '') {
    console.log('Error 1 Empty email and pass')
    res.status(401).json({
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
 
  Professional.findOne({ email })
    .then(professional => {
    
      if (!professional) {
        console.log('Error 2 Email wrong')
          res.status(401).json({ errorMessage: 'Email is not registered. Try with other email.' });
          return;
      } else if (bcrypt.compareSync(password, professional.passwordHash)) {
        req.session.user = professional;
        console.log('No error')
        res.status(200).json(professional);
      } else {
        console.log('error 3')
          res.status(401).json({ errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});




module.exports = router;