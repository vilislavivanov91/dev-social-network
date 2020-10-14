const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.school = !isEmpty(data.school) ? data.school : data.school = '';
  data.degree = !isEmpty(data.degree) ? data.degree : data.degree = '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : data.fieldofstudy = '';
  data.from = !isEmpty(data.from) ? data.from : data.from = '';

  if(validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if(validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }
  if(validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Fieldofstudy field is required';
  }
  if(validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }
  // if(data.current) {
  //   if(!validator.isBoolean(data.current)) {
  //     errors.company = 'Current field must be true or false';
  //   }
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}