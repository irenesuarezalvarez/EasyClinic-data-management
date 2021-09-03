require('dotenv').config();
/* const path = require("path"); */
/* const cookieParser = require("cookie-parser");  */
const express = require("express");
const cors = require('cors');

const app = express();

require("./config/db.config");
require("./config/session.config")(app); 
/* require("./config/cloudinary.config"); */  // BORRAR?

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(cookieParser()); */
/// PREVIOUS CODE

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
})) 


/////

//NEW CODE
/* const whitelist = [
  "https://talkdata.herokuapp.com"
];
app.use(cors({
  origin: function (origin, callback) {
		console.log(`Myyyy Origin: ${origin}`);
		if (!origin) return callback(null, true);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
})) */
//

////
app.use('/auth', require('./routes/auth-routes'));
app.use('/patients', require('./routes/patient-routes'));
app.use('/professionals', require('./routes/professional-routes'));
app.use('/appointments', require('./routes/appointment-routes')); 
app.use('/history', require('./routes/history-routes')); 

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

