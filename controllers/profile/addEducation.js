const Profile = require('../../model/Profile');

module.exports = (req, res) => {
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
};
