const addEducation = require('./addEducation');
const addExperience = require('./addExperience');
const createOrEditProfile = require('./createOrEditProfile');
const deleteEducation = require('./deleteEducation');
const deleteExperience = require('./deleteExperience');
const deleteProfile = require('./deleteProfile');
const getAllProfiles = require('./getAllProfiles');
const getCurrentLoggedInProfile = require('./getCurrentLoggedInProfile');
const getProfileByHandle = require('./getProfileByHandle');
const getProfileById = require('./getProfileById');

module.exports = {
  addEducation,
  addExperience,
  createOrEditProfile,
  deleteEducation,
  deleteExperience,
  deleteProfile,
  getAllProfiles,
  getCurrentLoggedInProfile,
  getProfileByHandle,
  getProfileById,
};
