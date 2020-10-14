const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : data.email = '';
  data.name = !isEmpty(data.name) ? data.name : data.name = '';
  data.password = !isEmpty(data.password) ? data.password : data.password = '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : data.confirmPassword = '';

  if(!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(validator.isEmpty(data.email)) {
    errors.email = 'Email field is required!';
  }

  if(validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if(validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if(data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Password and confimr password do not match';
  }
  
  if(validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}