const Post = require('../../model/Post');

module.exports = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ noposts: 'No posts found' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return Post.findByIdAndRemove(req.params.postId);
    })
    .then(() => {
      res.json({ msg: 'success' });
    })
    .catch((err) => res.status(404).json({ noposts: 'No posts found' }));
};
