import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../common/Spinner';
import PostActions from './PostActions';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import {
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
  deleteComment,
} from '../../actions/post';

class Post extends Component {
  state = {
    isUserAuthourOfPost: false,
    showCommentForm: false,
    errors: null,
  };
  componentDidMount() {
    if (!this.props.match.params.postId) {
      this.props.history.push('/');
    }

    const postId = this.props.match.params.postId;
    this.props.getSinglePost(postId);
  }

  static getDerivedStateFromProps(props, state) {
    // Check if there is errors in props and if they are different from current errors in state
    if (props.errors !== state.errors || Object.keys(props.errors).length > 0) {
      return {
        ...state,
        errors: props.errors,
      };
    }
    if (props.currentUserId && props.postCreatedByUser) {
      const isUserAuthourOfPost =
        props.postCreatedByUser === props.currentUserId;
      // Check if current value of isUserAuthorOfPost is different then the current props state
      if (isUserAuthourOfPost !== state.isUserAuthourOfPost)
        return {
          ...state,
          isUserAuthourOfPost,
        };
    }
    return null;
  }

  toggleShowCommentForm = () => {
    this.setState((state) => ({
      showCommentForm: !state.showCommentForm,
    }));
  };

  deletePost = () => {
    if (this.state.isUserAuthourOfPost) {
      this.props.deletePost(this.props.post._id, this.props.history);
    }
  };
  likePost = () => {
    this.props.likePost(this.props.post._id);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.post._id);
  };
  deleteComment = (commentId) => {
    this.props.deleteComment(this.props.post._id, commentId);
  };

  render() {
    let dispayPost;
    if (this.props.loading || Object.keys(this.props.post).length === 0) {
      dispayPost = <Spinner />;
    } else {
      dispayPost = (
        <div>
          <p>{this.props.post.text}</p>
          {/* <Link to={`/profile/${post.handle}`}> */}
          <p>by {this.props.post.userEmail}</p>
          {/* </Link> */}

          <p>
            Created at{' '}
            <Moment data={this.props.post.date} format="DD/MM/YYYY" />
          </p>
          <p>Likes: {this.props.post.likes.length}</p>
          {Object.keys(this.state.errors).length > 0 && (
            <p>Error: {this.state.errors.error}</p>
          )}
          <CommentList
            comments={this.props.post.comments}
            deleteComment={this.deleteComment}
          />
          <PostActions
            isAuthor={this.state.isUserAuthourOfPost}
            onAddCommentClick={this.toggleShowCommentForm}
            onDeleteClick={this.deletePost}
            onLikeClicked={this.likePost}
            onUnlikeClicked={this.unlikePost}
          />
          {this.state.showCommentForm && <CommentForm />}
          <hr />
        </div>
      );
    }

    return dispayPost;
  }
}

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  post: state.post.post,
  currentUserId: state.auth.user.id,
  postCreatedByUser: state.post.post.user,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
  deleteComment,
})(withRouter(Post));
