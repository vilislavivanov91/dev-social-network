const Post = require('../../model/Post');
const Profile = require('../../model/Profile');

module.exports = (req, res) => {
  // validate user input
  const { isValid, errors } = require('../../validation/post')(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ profile: 'Not found' });
      }

      const postData = {
        text: req.body.text,
        user: req.user.id,
        userHandle: profile.handle,
        userEmail: req.user.email,
        likes: [],
        comments: [],
      };

      const post = new Post(postData);

      post
        .save()
        .then((post) => {
          res.json(post);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
