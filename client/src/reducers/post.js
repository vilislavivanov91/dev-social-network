import {
  SET_POST,
  SET_POSTS,
  LOADING_POSTS,
  LOADING_POSTS_FINISH,
  CREATE_POST,
  SET_SINGLE_POST,
  DELETE_POST,
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST: {
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    }
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    }
    case SET_SINGLE_POST: {
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    }
    case LOADING_POSTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOADING_POSTS_FINISH: {
      return {
        ...state,
        loading: false,
      };
    }
    case CREATE_POST: {
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    }
    case DELETE_POST: {
      const posts = state.posts.filter((post) => post._id !== action.payload);
      return {
        ...state,
        loading: false,
        posts,
      };
    }
    case ADD_COMMENT_LIKE: {
      const updatedPosts = state.posts;
      const postIndex = updatedPosts.findIndex(
        (post) => post._id === action.payload.postId
      );
      updatedPosts[postIndex] = action.payload.post;
      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    }
    case REMOVE_COMMENT_LIKE: {
      const updatedPosts = state.posts;
      const postIndex = updatedPosts.findIndex(
        (post) => post._id === action.payload.postId
      );
      updatedPosts[postIndex] = action.payload.post;
      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
