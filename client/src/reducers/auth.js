import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuth: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: Object.keys(action.payload).length > 0,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
