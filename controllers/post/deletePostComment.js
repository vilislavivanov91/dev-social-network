const Post = require('../../model/Post');

module.exports = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ noposts: 'No posts found' });
      }

      const commentToRemove = post.comments.find(
        (comment) => comment._id.toString() === req.params.commentId
      );

      if (commentToRemove.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== req.params.commentId
      );

      return post.save();
    })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json({ noposts: 'No posts found' }));
};
