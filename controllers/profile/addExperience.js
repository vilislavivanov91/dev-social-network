const Profile = require('../../model/Profile');

module.exports = (req, res) => {
  // validate
  const { errors, isValid } = require('../../validation/experience')(req.body);

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
};
