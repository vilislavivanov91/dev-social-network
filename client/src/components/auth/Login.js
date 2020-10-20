import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';

import { loginUser } from '../../actions/auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        // ...state,
        errors: props.errors,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(loginData, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { email, password } = this.state.errors;
    // const { email, password } = this.props.errors;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.submitForm}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
