require('dotenv').config();
/* const path = require("path"); */
/* const cookieParser = require("cookie-parser");  */
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const session = require("express-session");
/* const passport = require("passport");*/
const MongoStore = require("connect-mongo"); 

/* const {authUser} = require('./routes/basicAuth'); */


//DATA BASE
/* const DB_NAME = process.env.MONGODB_URI;
 
mongoose.connect(DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>
  console.log(
  `Successfully connected to the database ${DB_NAME}`
)
); */

const app = express()

app.set("trust proxy", 1);
app.use(
  session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: false, 
  cookie: {
    maxAge: 24 * 60 * 60 * 365 * 1000,
    sameSite: true, //DIFFERENT HERE WAS THE ERROR!!!!!!!!!!!!!
    httpOnly: false
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60*60*24,
  })
}))  
require("./config/db.config");
/* require("./config/session.config")(app); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(cookieParser()); */
app.use(cors({ // to enable the server receive data
  credentials: true,
  origin: ["http://localhost:3000"]
}))

/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  }); */
//SESSION
/* passport.serializeUser((user, cb) => {
  cb(null, user)
})
passport.deserializeUser((user, cb) => {
  cb(null, user)
}) */


 
/* app.use(passport.initialize())// Enable authentication using session + passport
app.use(passport.session())

 */
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require('./error-handling')(app);
/* app.use((req, res, next)=>{
  console.log('AQUIIIII APP TEST', req.session)
  next()
}) */
app.use('/auth', require('./routes/auth-routes'));
app.use('/patients', require('./routes/patient-routes'));
app.use('/professionals', require('./routes/professional-routes'));


//const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

