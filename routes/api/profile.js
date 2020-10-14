const express = require('express');
const passport = require('passport');
var mongoose = require('mongoose');

const Profile = require('../../model/Profile');
const User = require('../../model/User');

const router = express.Router();

// @route    GET api/profile/test
// @desc     Test auth route
// @access   Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Hello from api/profile/test' });
});

// @route    GET api/profile/
// @desc     Get profile for the current logged in user
// @access   Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userId = req.user._id;

    Profile.findOne({ user: userId })
      .populate('user', ['email', 'name'])
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ profile: 'Profile not found' });
        }
        console.log(profile);
        res.json(profile);
      })
      .catch((err) => console.log(err));
  }
);

// @route    GET api/profile/handle/:handle
// @desc     Get profile for specific handle
// @access   Public
router.get('/handle/:handle', (req, res) => {
  const handle = req.params.handle;

  Profile.findOne({ handle })
    .populate('user', ['email', 'name'])
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ profile: 'No profile found' });
      }
      res.json(profile);
    });
});

// @route    GET api/profile/handle/:handle
// @desc     Get profile for specific userid
// @access   Public
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;

  Profile.findOne({ user: userId })
    .populate('user', ['email', 'name'])
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ profile: 'No profile found' });
      }
      res.json(profile);
    });
});

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['email', 'name'])
    .then((profiles) => {
      if (!profiles) {
        return res.status(404).json({ profiles: 'No profiles found' });
      }
      res.json(profiles);
    });
});

// @route    POST api/profile/
// @desc     Create or edit profile for the current logged in user
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validate input values
    const { errors, isValid } = require('../../validation/profile')(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get and set input values
    const profileData = {};
    profileData.user = req.user.id;
    profileData.handle = req.body.handle;
    profileData.status = req.body.status;
    profileData.skills = req.body.skills.split(',').map((item) => item.trim());
    if (req.body.company) profileData.company = req.body.company;
    if (req.body.website) profileData.website = req.body.website;
    if (req.body.location) profileData.location = req.body.location;
    if (req.body.bio) profileData.bio = req.body.bio;
    if (req.body.githubusername)
      profileData.githubusername = req.body.githubusername;
    profileData.social = {};
    if (req.body.facebook) profileData.social.facebook = req.body.facebook;
    if (req.body.instagram) profileData.social.instagram = req.body.instagram;
    if (req.body.twitter) profileData.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileData.social.linkedin = req.body.linkedin;
    if (req.body.youtube) profileData.social.youtube = req.body.youtube;

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Edit existing profile
        if (profile) {
          return Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileData },
            { new: true }
          ).then((profile) => res.json(profile));
        }
        // Check if handle exists
        Profile.findOne({ handle: profileData.handle }).then((profile) => {
          if (profile) {
            // Handle already exists
            return res
              .status(400)
              .json({ handle: 'Handle field is already taken' });
          }
          // Create a new profile
          const newProfile = new Profile(profileData);
          newProfile.save().then((profile) => res.json(profile));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

// @route    POST api/profile/experience
// @desc     Add experience to current logged in user
// @access   Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // validate
    const { errors, isValid } = require('../../validation/experience')(
      req.body
    );

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userId = req.user.id;
    const experienceObj = {};
    experienceObj.title = req.body.title;
    experienceObj.company = req.body.company;
    experienceObj.from = req.body.from;
    if (req.body.to) experienceObj.to = req.body.to;
    if (req.body.location) experienceObj.location = req.body.location;
    if (req.body.current) experienceObj.current = req.body.current;
    if (req.body.description) experienceObj.description = req.body.description;

    Profile.findOne({ user: userId })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ profile: 'No profile found' });
        }
        profile.experience.unshift(experienceObj);
        return profile.save();
      })
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => console.log(err));
  }
);

// @route    POST api/profile/education
// @desc     Add education to current logged in user
// @access   Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // validate
    const { errors, isValid } = require('../../validation/education')(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userId = req.user.id;
    const educationObj = {};
    educationObj.school = req.body.school;
    educationObj.degree = req.body.degree;
    educationObj.fieldofstudy = req.body.fieldofstudy;
    educationObj.from = req.body.from;
    if (req.body.to) educationObj.to = req.body.to;
    if (req.body.current) educationObj.current = req.body.current;
    if (req.body.description) educationObj.description = req.body.description;

    Profile.findOne({ user: userId })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ profile: 'No profile found' });
        }
        profile.education.unshift(educationObj);
        return profile.save();
      })
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => console.log(err));
  }
);

// @route    DELETE api/profile/experience/:expId
// @desc     Delete experience from profile
// @access   Private
router.delete(
  '/experience/:expId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const expId = req.params.expId;
    const userId = req.user.id;

    Profile.findOne({ user: userId })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ profile: 'No profile found' });
        }

        profile.experience = profile.experience.filter(
          (item) => item._id.toString() !== expId
        );
        return profile.save();
      })
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => console.log(err));
  }
);

// @route    DELETE api/profile/education/:eduId
// @desc     Delete education from profile
// @access   Private
router.delete(
  '/education/:eduId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const eduId = req.params.eduId;
    const userId = req.user.id;

    Profile.findOne({ user: userId })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ profile: 'No profile found' });
        }

        profile.education = profile.education.filter(
          (item) => item._id.toString() !== eduId
        );
        return profile.save();
      })
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => console.log(err));
  }
);

// @route    DELETE api/profile
// @desc     Delete profile
// @access   Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Delete profile from Profile collection and user from User collection
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        return User.findOneAndRemove({ _id: req.user.id });
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
