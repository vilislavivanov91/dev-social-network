import axios from 'axios';
import {
  SET_POST,
  SET_POSTS,
  LOADING_POSTS,
  LOADING_POSTS_FINISH,
  LOADING_COMMENT,
  LOADING_COMMENT_FINISH,
  SET_ERRORS,
  CREATE_POST,
  SET_SINGLE_POST,
  DELETE_POST,
  ADD_COMMENT,
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
        // Clear errors
        dispatch({ type: SET_ERRORS, payload: {} });
      })
      .catch((err) => {
        dispatch({ type: LOADING_POSTS_FINISH });
        dispatch({ type: SET_ERRORS, payload: err.response.data });
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

export const addComment = (commentData, postId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_COMMENT });

    axios
      .post(`/api/post/comment/${postId}`, commentData)
      .then((response) => {
        dispatch(setSinglePost(response.data));
        // Clear errors
        dispatch({ type: SET_ERRORS, payload: {} });
      })
      .catch((err) => {
        dispatch({ type: LOADING_COMMENT_FINISH });
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      });
  };
};

export const likePost = (postId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });

    axios
      .post(`/api/post/like/${postId}`)
      .then((response) => {
        dispatch(setSinglePost(response.data));
      })
      .catch((err) => {
        dispatch({ type: LOADING_POSTS_FINISH });
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      });
  };
};

export const unlikePost = (postId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POSTS });
    axios
      .post(`/api/post/unlike/${postId}`)
      .then((response) => {
        // Clear the errors in case user clicked more then once on like button and it will dispatch an error action
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch(setSinglePost(response.data));
      })
      .catch((err) => {
        dispatch({ type: LOADING_POSTS_FINISH });
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      });
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_COMMENT });
    axios
      .delete(`/api/post/comment/${postId}/${commentId}`)
      .then((response) => {
        dispatch(setSinglePost(response.data));
      })
      .catch((err) => {
        dispatch({ type: LOADING_POSTS_FINISH });
        dispatch({ type: SET_ERRORS, payload: err.response.data });
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
