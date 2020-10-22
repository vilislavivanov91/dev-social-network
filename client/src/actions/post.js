import axios from 'axios';
import {
  SET_POST,
  SET_POSTS,
  LOADING_POSTS,
  SET_ERRORS,
  CREATE_POST,
  LOADING_POSTS_FINISH,
  SET_SINGLE_POST,
  DELETE_POST,
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

export const getSinglePost = (postId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });

    axios
      .get(`/api/post/${postId}`)
      .then((response) => dispatch(setSinglePost(response.data)))
      .catch((err) => dispatch(setSinglePost({})));
  };
};

export const deletePost = (postId, history) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });

    axios
      .delete(`/api/post/${postId}`)
      .then((response) => {
        dispatch(setSinglePost({}));
        dispatch({
          type: DELETE_POST,
          payload: postId,
        });
        history.push('/posts');
      })
      .catch((err) => {
        dispatch({ type: LOADING_POSTS_FINISH });
        dispatch({ type: SET_ERRORS, payload: err });
      });
  };
};

export const setSinglePost = (post) => ({
  type: SET_SINGLE_POST,
  payload: post,
});

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
