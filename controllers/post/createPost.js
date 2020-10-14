const Post = require('../../model/Post');

module.exports = (req, res) => {
  // validate user input
  const { isValid, errors } = require('../../validation/post')(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const postData = {
    text: req.body.text,
    user: req.user.id,
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
};
