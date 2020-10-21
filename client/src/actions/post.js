import axios from 'axios';
import {
  SET_POST,
  SET_POSTS,
  LOADING_POSTS,
  SET_ERRORS,
  CREATE_POST,
  LOADING_POSTS_FINISH,
} from './types';

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

export const createPost = (text) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });
    axios
      .post('api/post', { text })
      .then((response) => {
        dispatch(addPost(response.data));
      })
      .catch((err) => {
        dispatch({ type: LOADING_POSTS_FINISH });
        dispatch({ type: SET_ERRORS, payload: err });
      });
  };
};

export const addPost = (post) => {
  return {
    type: CREATE_POST,
    payload: post,
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
