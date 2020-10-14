const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : data.email = '';
  data.password = !isEmpty(data.password) ? data.password : data.password = '';

  if(!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if(validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}