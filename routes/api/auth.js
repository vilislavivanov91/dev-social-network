const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../model/User');
const secretOrKey = require('../../config/keys').secretOrKey;

// @route    GET api/auth/test
// @desc     Test auth route
// @access   Public
router.get('/test', (req, res) => {
  res.json({msg: 'Hello from api/auth/test'});
});

// @route    POST api/auth/register
// @desc     Register a new user, generate and return a token
// @access   Public
router.post('/register', (req, res) => {
  // validate user input
  const { errors, isValid } = require('../../validation/register')(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  User.findOne({email})
    .then(user => {
      if (user) {
        return res.status(409).json({email: 'Email already exists'});
      }

      const newUser = new User({
        email,
        password,
        name
      })

      bcrypt.genSalt(10)
        .then(salt => {
          return bcrypt.hash(newUser.password, salt);
        })
        .then(hashed => {
          newUser.password = hashed;
          return newUser.save();
        })
        .then(user => {
          jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            secretOrKey,
            {expiresIn: 3600},
            (err, token) => {
            if (err) {
              // Send more adequate status code
              return res.status(400).json({token: 'Error generating a token for this user, please try again'})
            }
            res.json({
              token: 'Bearer ' + token,
              email: user.email,
              id: user._id,
              name: user.name
            });
            }
          )
        })
        .catch(err => console.log(err))
    })
});

// @route    POST api/auth/login
// @desc     Login already existing user, generate and return a token
// @access   Public
router.post('/login', (req, res) => {
  // Validate user input
  const { errors, isValid } = require('../../validation/login')(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  let currentUser;

  User.findOne({email})
    .then(user => {
      if(!user) {
        return res.status(404).json({email: 'Email not found'});
      }
      currentUser = user;
      bcrypt.compare(password, user.password)
      .then(isMatched => {
        if (!isMatched) {
          return res.status(400).json({password: 'Wrong password field'});
        }
  
        jwt.sign(
          { id: currentUser._id, email: currentUser.email, name: currentUser.name },
          secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            if (err) {
              // Send more adequate status code
              return res.status(400).json({token: 'Error generating a token for this user, please try again'})
            }
            res.json({
              token: 'Bearer ' + token,
              email: currentUser.email,
              id: currentUser._id,
              name: currentUser.name
            });
          }
        )
      });
    })
    .catch(err => {
      console.log(err);
    })
});

// @route    GET api/auth/current
// @desc     GET current logged in user
// @access   Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({user: req.user.email, id: req.user._id});
})

module.exports = router;
