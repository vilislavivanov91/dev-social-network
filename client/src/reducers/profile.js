import { SET_PROFILE, SET_PROFILES, LOADING_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
