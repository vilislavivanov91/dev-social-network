import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import AreaFieldGroup from '../common/AreaFieldGroup';
import { addExperience } from '../../actions/profile';

class AddExperience extends Component {
  state = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return {
        ...state,
        errors: props.errors,
      };
    }

    return null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheckboxClick = (e) => {
    this.setState((prevState) => ({ current: !prevState.current }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description,
      current: this.state.current,
    };

    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="title"
                  placeholder="* Job Title"
                  value={this.state.title}
                  error={errors.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="company"
                  placeholder="* Company"
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  error={errors.location}
                  onChange={this.onChange}
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.onChange}
                />
                {this.state.current ? null : (
                  <div>
                    <h6>To Date</h6>
                    <TextFieldGroup
                      type="date"
                      name="to"
                      value={this.state.to}
                      error={errors.to}
                      onChange={this.onChange}
                    />
                  </div>
                )}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    id="current"
                    onClick={this.onCheckboxClick}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <AreaFieldGroup
                  name="description"
                  placeholder="Job Description"
                  value={this.state.description}
                  error={errors.description}
                  info="Some of your responsabilities, etc"
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
