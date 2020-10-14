import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const displayOptions = options.map((option) => {
    return (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    );
  });
  return (
    <div className="form-group">
      <select
        className={classNames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {displayOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
};

export default SelectListGroup;
