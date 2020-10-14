const Profile = require('../../model/Profile');

module.exports = (req, res) => {
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
};
