const Profile = require('../../model/Profile');

module.exports = (req, res) => {
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
};
