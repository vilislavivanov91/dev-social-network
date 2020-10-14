import { combineReducers } from 'redux';

import authReducer from './auth';
import errorReducer from './error';
import profileReducer from './profile';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
});

export default rootReducer;
