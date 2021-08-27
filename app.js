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
require("./config/cloudinary.config"); //ADDEEED

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(cookieParser()); */
app.use(cors({ // to enable the server receive data
  credentials: true,
  origin: ["http://localhost:3000"]
}))



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require('./error-handling')(app);

app.use('/auth', require('./routes/auth-routes'));
app.use('/patients', require('./routes/patient-routes'));
app.use('/professionals', require('./routes/professional-routes'));
app.use('/api', require('./routes/history-routes')); 
/* app.use(express.static(path.join(__dirname, "public"))); */


app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

