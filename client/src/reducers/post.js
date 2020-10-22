import {
  SET_POST,
  SET_POSTS,
  LOADING_POSTS,
  LOADING_POSTS_FINISH,
  CREATE_POST,
  SET_SINGLE_POST,
  DELETE_POST,
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
    case LOADING_POSTS_FINISH: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
