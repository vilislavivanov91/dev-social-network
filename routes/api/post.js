const express = require('express');
const passport = require('passport');

const Post = require('../../model/Post');

const router = express.Router();

// @route    GET api/post/test
// @desc     Test post route
// @access   Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Hello from api/post/test' });
});

// @route    GET api/post/all
// @desc     Get all posts
// @access   Public
router.get('/all', (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(404).json({ noposts: 'No posts found' }));
});

// @route    GET api/post/:postId
// @desc     Get post by id
// @access   Public
router.get('/:postId', (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'No post found' });
      }

      res.json(post);
    })
    .catch((err) => res.status(404).json({ error: 'No post found' }));
});

// @route    POST api/post
// @desc     Create a post
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
);

// @route    DELETE api/post/:postId
// @desc     Delete a post
// @access   Private
router.delete(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
);

// @route    POST api/post/comment/:postId
// @desc     Create a comment for specific post
// @access   Private
router.post(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
);

// @route    DELETE api/post/comment/:postId
// @desc     Delete a comment
// @access   Private
router.delete(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
);

// Like post

// @route    POST api/post/like/:postId
// @desc     Add user to like array
// @access   Private
router.post(
  '/like/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ noposts: 'No posts found' });
        }

        if (
          post.likes.length > 0 &&
          post.likes.map((like) => like.user.toString()).indexOf(req.user.id) >
            -1
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
  }
);

// @route    POST api/post/unlike/:postId
// @desc     Remove user from like array
// @access   Private
router.post(
  '/unlike/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
);

module.exports = router;
