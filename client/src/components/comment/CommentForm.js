import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import { addComment } from '../../actions/post';

class CommentForm extends Component {
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

  onCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = { text: this.state.text };
    this.props.addComment(commentData, this.props.post._id);
    this.setState({ text: '' });
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onCommentSubmit}>
          <TextFieldGroup
            name="text"
            value={this.state.text}
            onChange={this.onInputChange}
            placeholder="Write a comment"
            error={this.state.errors ? this.state.errors.text : null}
          />
          <button className="btn btn-primary" onClick={this.onCommentSubmit}>
            Post
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  post: state.post.post,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
