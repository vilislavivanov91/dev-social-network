const express = require('express');
const passport = require('passport');

const { login, register, getCurrent } = require('../../controllers/auth');
const router = express.Router();

// @route    POST api/auth/register
// @desc     Register a new user, generate and return a token
// @access   Public
router.post('/register', register);

// @route    POST api/auth/login
// @desc     Login already existing user, generate and return a token
// @access   Public
router.post('/login', login);

// @route    GET api/auth/current
// @desc     GET current logged in user
// @access   Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  getCurrent
);

module.exports = router;
