const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/Professional.model");

/* const saltRounds = 10; */
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
    const passwordHash = bcryptjs.hashSync(password, salt); //user password = hashed password
    const newUser = new User({ username, email, passwordHash})
    newUser.save()
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


module.exports = router;