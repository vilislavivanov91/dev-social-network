const Post = require('../../model/Post');

module.exports = (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'No post found' });
      }

      res.json(post);
    })
    .catch((err) => res.status(404).json({ error: 'No post found' }));
};
