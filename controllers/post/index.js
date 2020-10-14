const createPost = require('./createPost');
const createPostComment = require('./createPostComment');
const deletePost = require('./deletePost');
const deletePostComment = require('./deletePostComment');
const getAllPosts = require('./getAllPosts');
const getPostById = require('./getPostById');
const likePost = require('./likePost');
const unlinkePost = require('./unlinkePost');

module.exports = {
  createPost,
  createPostComment,
  deletePost,
  deletePostComment,
  getAllPosts,
  getPostById,
  likePost,
  unlinkePost,
};
