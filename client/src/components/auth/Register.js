import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';

import { registerUser } from '../../actions/auth';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formSubmit = (e) => {
    e.preventDefault();

    const registerData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.registerUser(registerData, this.props.history);
  };

  render() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard');
    }
    const { email, name, password, confirmPassword } = this.state.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.formSubmit}>
                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  error={name}
                  value={this.state.name}
                  onChange={this.inputChange}
                />
                <TextFieldGroup
                  name="email"
                  placeholder="Email"
                  error={email}
                  value={this.state.email}
                  onChange={this.inputChange}
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="Password"
                  error={password}
                  value={this.state.password}
                  onChange={this.inputChange}
                />
                <TextFieldGroup
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  error={confirmPassword}
                  value={this.state.confirmPassword}
                  onChange={this.inputChange}
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

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
