const Profile = require('../../model/Profile');

module.exports = (req, res) => {
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
};
