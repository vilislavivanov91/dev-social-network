const Profile = require('../../model/Profile');

module.exports = (req, res) => {
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
};
