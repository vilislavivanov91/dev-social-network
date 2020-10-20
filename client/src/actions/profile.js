import axios from 'axios';

import {
  SET_PROFILE,
  SET_PROFILES,
  LOADING_PROFILE,
  SET_ERRORS,
  SET_CURRENT_USER,
} from './types';

export const getProfile = () => (dispatch) => {
  dispatch({ type: LOADING_PROFILE });
  return axios
    .get('/api/profile')
    .then((res) => {
      const profile = res.data;
      // Check if profile object has social as key
      // bc somehow in mongo db there is a social empty obj but its not present in res.data
      // And if there is not a social key, add it as empty object
      if (!profile.hasOwnProperty('social')) {
        profile.social = {};
      }
      dispatch(setProfile(profile));
    })
    .catch((err) => {
      dispatch(setProfile({}));
    });
};

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE });
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) => {
      const profile = res.data;
      // Check if profile object has social as key
      // bc somehow in mongo db there is a social empty obj but its not present in res.data
      // And if there is not a social key, add it as empty object
      if (!profile.hasOwnProperty('social')) {
        profile.social = {};
      }
      dispatch(setProfile(profile));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAllProfiles = () => (dispatch) => {
  console.log('get all');
  dispatch({ type: LOADING_PROFILE });
  axios
    .get('/api/profile/all/')
    .then((res) => {
      dispatch(setProfiles(res.data));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const createProfile = (profileData, history) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE });
  axios
    .post('/api/profile', profileData)
    .then((res) => {
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post('/api/profile/experience', expData)
    .then((res) => {
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post('/api/profile/education', eduData)
    .then((res) => {
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteEducation = (id) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE });
  axios
    .delete(`api/profile/education/${id}`)
    .then((res) => {
      dispatch(setProfile(res.data));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteExperience = (id) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE });
  axios
    .delete(`api/profile/experience/${id}`)
    .then((res) => {
      dispatch(setProfile(res.data));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    payload: profile,
  };
};

export const setProfiles = (profiles) => {
  return {
    type: SET_PROFILES,
    payload: profiles,
  };
};

export const deleteProfile = () => (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    dispatch({ type: LOADING_PROFILE });
    axios
      .delete('api/profile')
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};
