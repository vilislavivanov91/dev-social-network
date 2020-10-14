import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import AreaFieldGroup from '../common/AreaFieldGroup';
import { addEducation } from '../../actions/profile';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description,
      current: this.state.current,
    };

    this.props.addEducation(expData, this.props.history);
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
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="school"
                  placeholder="* School Name"
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="degree"
                  placeholder="* Degree"
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="fieldofstudy"
                  placeholder="* Fieldofstudy"
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
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
                    Current
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

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
