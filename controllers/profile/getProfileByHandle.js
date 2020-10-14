const Profile = require('../../model/Profile');

module.exports = (req, res) => {
  const handle = req.params.handle;

  Profile.findOne({ handle })
    .populate('user', ['email', 'name'])
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ profile: 'No profile found' });
      }
      res.json(profile);
    });
};
