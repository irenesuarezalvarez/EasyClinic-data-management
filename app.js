require('dotenv').config();
/* const path = require("path"); */
const cookieParser = require("cookie-parser"); 
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const cors = require('cors');
/* const {authUser} = require('./routes/basicAuth'); */


//DATA BASE
const DB_NAME = process.env.MONGODB_URI;
 
mongoose.connect(DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>
  console.log(
  `Successfully connected to the database ${DB_NAME}`
)
);

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // to enable the server receive data

//SESSION
passport.serializeUser((user, cb) => {
  cb(null, user)
})
passport.deserializeUser((user, cb) => {
  cb(null, user)
})

app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 365 * 1000,
    sameSite: 'none'
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60*60*24,
   /*  crypto: {
      secret: 'squirrel' //For sensitive data, encryption. Commented to use later
    } */
  })
})) 

 
app.use(passport.initialize())// Enable authentication using session + passport
app.use(passport.session())


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require('./error-handling')(app);
app.use((req, res, next)=>{
  console.log('AQUIIIII APP TEST', req.session)
  next()
})
app.use('/auth', require('./routes/auth-routes'));
app.use('/patients', require('./routes/patient-routes'));
app.use('/professionals', require('./routes/professional-routes'));


//const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

