
const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  app.use(
    session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: false, 
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000,
      sameSite: "lax", //SET BEFORE TO 'NONE', HERE WAS THE ERROR!!!!!!!!!!!!!SameSite=None; Secure
      httpOnly: false
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60*60*24,
    })
  })
  ) 
  
};
////////
/* module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      key: "hello",
      proxy: true,
      saveUninitialized: true,
      cookie:{
        secure: true,
        sameSite: "none",
        httpOnly: false,
        maxAge: 60000000, 
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60 * 60 * 24,
      }),
    })
  );
}; */
///////
