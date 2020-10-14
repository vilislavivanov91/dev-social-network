const Post = require('../../model/Post');

module.exports = (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(404).json({ noposts: 'No posts found' }));
};
