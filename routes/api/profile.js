const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  addEducation,
  addExperience,
  createOrEditProfile,
  deleteEducation,
  deleteExperience,
  deleteProfile,
  getAllProfiles,
  getCurrentLoggedInProfile,
  getProfileByHandle,
  getProfileById,
} = require('../../controllers/profile');

// @route    GET api/profile/
// @desc     Get profile for the current logged in user
// @access   Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getCurrentLoggedInProfile
);

// @route    GET api/profile/handle/:handle
// @desc     Get profile for specific handle
// @access   Public
router.get('/handle/:handle', getProfileByHandle);

// @route    GET api/profile/user/:userId
// @desc     Get profile for specific userid
// @access   Public
router.get('/user/:userId', getProfileById);

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get('/all', getAllProfiles);

// @route    POST api/profile/
// @desc     Create or edit profile for the current logged in user
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createOrEditProfile
);

// @route    POST api/profile/experience
// @desc     Add experience to current logged in user
// @access   Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  addExperience
);

// @route    POST api/profile/education
// @desc     Add education to current logged in user
// @access   Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  addEducation
);

// @route    DELETE api/profile/experience/:expId
// @desc     Delete experience from profile
// @access   Private
router.delete(
  '/experience/:expId',
  passport.authenticate('jwt', { session: false }),
  deleteExperience
);

// @route    DELETE api/profile/education/:eduId
// @desc     Delete education from profile
// @access   Private
router.delete(
  '/education/:eduId',
  passport.authenticate('jwt', { session: false }),
  deleteEducation
);

// @route    DELETE api/profile
// @desc     Delete profile
// @access   Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  deleteProfile
);

module.exports = router;
