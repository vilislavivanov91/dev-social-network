const Profile = require('../../model/Profile');

module.exports = (req, res) => {
  const userId = req.params.userId;

  Profile.findOne({ user: userId })
    .populate('user', ['email', 'name'])
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ profile: 'No profile found' });
      }
      res.json(profile);
    });
};
