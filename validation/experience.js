const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : data.title = '';
  data.company = !isEmpty(data.company) ? data.company : data.company = '';
  data.from = !isEmpty(data.from) ? data.from : data.from = '';

  if(validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if(validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }
  if(validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }
  // if(data.current) {
  //   if(!validator.isBoolean(data.current)) {
  //     errors.current = 'Current field must be true or false';
  //   }
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}