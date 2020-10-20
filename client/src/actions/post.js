import axios from 'axios';
import { SET_POST, SET_POSTS, LOADING_POSTS, SET_ERRORS } from './types';

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });
    axios
      .get('api/post/all')
      .then((response) => {
        dispatch(setPosts(response.data));
      })
      .catch((err) => {
        dispatch(setPosts([]));
      });
  };
};

export const getPost = (postId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });
    axios
      .get(`api/post/${postId}`)
      .then((response) => {
        dispatch(setPost(response.data));
      })
      .catch((err) => {
        dispatch(setPost({}));
      });
  };
};

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

export const setPost = (post) => ({
  type: SET_POST,
  payload: post,
});
