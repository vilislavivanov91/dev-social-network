import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';

import { createPost } from '../../actions/post';

class PostForm extends Component {
  state = {
    text: '',
    errors: null,
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

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.createPost(this.state.text);
    this.setState({ text: '' });
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <TextFieldGroup
                name="text"
                value={this.state.text}
                onChange={this.onInputChange}
                placeholder="Create a post"
                error={this.state.errors ? this.state.errors.text : null}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onFormSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createPost })(PostForm);
