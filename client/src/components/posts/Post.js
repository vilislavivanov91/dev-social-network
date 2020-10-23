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
} from '../../actions/post';

class Post extends Component {
  state = {
    isUserAuthourOfPost: false,
    showCommentForm: false,
  };
  componentDidMount() {
    if (!this.props.match.params.postId) {
      this.props.history.push('/');
    }

    const postId = this.props.match.params.postId;
    this.props.getSinglePost(postId);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentUserId && props.postCreatedByUser) {
      return {
        ...state,
        isUserAuthourOfPost: props.postCreatedByUser === props.currentUserId,
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
          <CommentList comments={this.props.post.comments} />
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
});

export default connect(mapStateToProps, {
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
})(withRouter(Post));
