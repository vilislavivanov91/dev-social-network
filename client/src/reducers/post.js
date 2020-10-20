import { SET_POST, SET_POSTS, LOADING_POSTS } from '../actions/types';

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
    case LOADING_POSTS: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
