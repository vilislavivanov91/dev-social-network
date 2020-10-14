import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { SET_ERRORS, SET_CURRENT_USER } from './types';

const setErrors = (errors) => {
  return {
    type: SET_ERRORS,
    payload: errors,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const loginUser = (loginData, history) => {
  return (dispatch) => {
    axios
      .post('/api/auth/login', loginData)
      .then((res) => {
        const token = res.data.token;
        const payload = jwtDecode(token);
        // Add token to session storage
        sessionStorage.setItem('token', token);
        // Add token to axios authorization header
        setAuthToken(token);
        // Set current user data
        dispatch(setCurrentUser(payload));
        dispatch(setErrors({}));
        // Set timeout to logout after expiration time
        const logoutAfter = (payload.exp - Date.now() / 1000) * 1000;

        setTimeout(() => {
          dispatch(logoutUser());
        }, logoutAfter);
        // Redirect after login
        history.push('/dashboard');
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
      });
  };
};

export const registerUser = (regData, history) => {
  return (dispatch) => {
    axios
      .post('/api/auth/register', regData)
      .then((res) => {
        dispatch(setErrors({}));
        history.push('/login');
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
      });
  };
};

export const logoutUser = () => {
  // Remove token from session storage & set current user in store to {}
  sessionStorage.removeItem('token');
  setAuthToken(null);
  return {
    type: SET_CURRENT_USER,
    payload: {},
  };
};
