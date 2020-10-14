const Profile = require('../../model/Profile');

module.exports = (req, res) => {
  Profile.find()
    .populate('user', ['email', 'name'])
    .then((profiles) => {
      if (!profiles) {
        return res.status(404).json({ profiles: 'No profiles found' });
      }
      res.json(profiles);
    });
};
