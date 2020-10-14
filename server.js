const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const mongoURI = require('./config/keys').mongoURI;
const port = require('./config/keys').port;
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/post');

// Connect to MongoDB
mongoose.connect(mongoURI, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('mongo connected');

  // Connect Middlewares
  app.use(express.json());
  app.use(express.urlencoded());

  // Configure passport
  app.use(passport.initialize());
  require('./config/passportConfig')(passport);

  // Connect Routes
  app.use('/api/auth', authRoute);
  app.use('/api/profile', profileRoute);
  app.use('/api/post', postRoute);

  app.listen(port, () => {
    console.log('app up and running at port' + port);
  });
});
