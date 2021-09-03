require('dotenv').config();
/* const path = require("path"); */
/* const cookieParser = require("cookie-parser");  */
const express = require("express");
const cors = require('cors');

/* const passport = require("passport");*/
/* const {authUser} = require('./routes/basicAuth'); */

const app = express()

require("./config/db.config");
require("./config/session.config")(app); 
/* require("./config/BORRARcloudinary.config"); */ // BORRAR?

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(cookieParser()); */
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}))

app.use('/auth', require('./routes/auth-routes'));
app.use('/patients', require('./routes/patient-routes'));
app.use('/professionals', require('./routes/professional-routes'));
app.use('/appointments', require('./routes/appointment-routes')); 
app.use('/history', require('./routes/history-routes')); 

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

