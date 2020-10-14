const Post = require('../../model/Post');

module.exports = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ noposts: 'No posts found' });
      }

      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );

      return post.save().then((post) => {
        res.json(post);
      });
    })
    .catch((err) => res.status(404).json({ noposts: 'No posts found' }));
};
