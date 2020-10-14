const Profile = require('../../model/Profile');
const User = require('../../model/User');

module.exports = (req, res) => {
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
};
