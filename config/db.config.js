const mongoose = require('mongoose')
const DB_NAME = process.env.MONGODB_URI

mongoose
  .connect(DB_NAME, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /* useFindAndModify: false, */ //needed?
  })
  .then(() =>
    console.log(`Successfully connected to the database ${DB_NAME}`)
  )
  .catch((error) => {
    console.error(
      `An error ocurred trying to connect to the database ${DB_NAME}: `,
      error
    );
    process.exit(1);
  });

