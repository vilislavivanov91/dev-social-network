const Post = require('../../model/Post');

module.exports = (req, res) => {
  // validate user input
  const { isValid, errors } = require('../../validation/post')(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const postId = req.params.postId;

  const commentData = {
    text: req.body.text,
    user: req.user.id,
    userEmail: req.user.email,
  };

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ noposts: 'No posts found' });
      }

      post.comments.unshift(commentData);

      return post.save();
    })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json({ noposts: 'No posts found' }));
};
