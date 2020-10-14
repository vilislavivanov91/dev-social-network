const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : data.handle = '';
  data.status = !isEmpty(data.status) ? data.status : data.status = '';
  data.skills = !isEmpty(data.skills) ? data.skills : data.skills = '';
  // if (data.company) data.company = !isEmpty(data.company) ? data.company : data.company = '';
  // if (data.website) data.website = !isEmpty(data.website) ? data.website : data.website = '';
  // if (data.location) data.location = !isEmpty(data.location) ? data.location : data.location = '';
  // if (data.bio) data.bio = !isEmpty(data.bio) ? data.bio : data.bio = '';
  // if (data.githubusername) data.githubusername = !isEmpty(data.githubusername) ? data.githubusername : data.githubusername = '';
  // if (data.facebook) data.facebook = !isEmpty(data.facebook) ? data.facebook : data.facebook = '';
  // if (data.instagram) data.instagram = !isEmpty(data.instagram) ? data.instagram : data.instagram = '';
  // if (data.twitter) data.twitter = !isEmpty(data.twitter) ? data.twitter : data.twitter = '';
  // if (data.linkedin) data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : data.linkedin = '';
  // if (data.youtube) data.youtube = !isEmpty(data.youtube) ? data.youtube : data.youtube = '';


  if(validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required';
  }
  if(!validator.isLength(data.handle, {max: 40})) {
    errors.handle = 'Handle field must be maximum 40 characters';
  }
  if(validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }
  if(validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }
  if(data.website) {
   if (!validator.isURL(data.website)) {
    errors.website = 'Website field must be a valid website';
   }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}