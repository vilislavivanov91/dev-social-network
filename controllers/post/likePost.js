const Post = require('../../model/Post');

module.exports = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ noposts: 'No posts found' });
      }

      if (
        post.likes.length > 0 &&
        post.likes.map((like) => like.user.toString()).indexOf(req.user.id) > -1
      ) {
        // user already liked this post
        return res
          .status(400)
          .json({ error: 'Post already liked by this user' });
      }

      post.likes.unshift({ user: req.user.id });

      post.save().then((post) => {
        res.json(post);
      });
    })
    .catch((err) => console.log(err));
};
