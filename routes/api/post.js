const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  createPost,
  createPostComment,
  deletePost,
  deletePostComment,
  getAllPosts,
  getPostById,
  likePost,
  unlinkePost,
} = require('../../controllers/post');

// @route    GET api/post/all
// @desc     Get all posts
// @access   Public
router.get('/all', getAllPosts);

// @route    GET api/post/:postId
// @desc     Get post by id
// @access   Public
router.get('/:postId', getPostById);

// @route    POST api/post
// @desc     Create a post
// @access   Private
router.post('/', passport.authenticate('jwt', { session: false }), createPost);

// @route    DELETE api/post/:postId
// @desc     Delete a post
// @access   Private
router.delete(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  deletePost
);

// @route    POST api/post/comment/:postId
// @desc     Create a comment for specific post
// @access   Private
router.post(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  createPostComment
);

// @route    DELETE api/post/comment/:postId
// @desc     Delete a comment
// @access   Private
router.delete(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  deletePostComment
);

// Like post

// @route    POST api/post/like/:postId
// @desc     Add user to like array
// @access   Private
router.post(
  '/like/:postId',
  passport.authenticate('jwt', { session: false }),
  likePost
);

// @route    POST api/post/unlike/:postId
// @desc     Remove user from like array
// @access   Private
router.post(
  '/unlike/:postId',
  passport.authenticate('jwt', { session: false }),
  unlinkePost
);

module.exports = router;
