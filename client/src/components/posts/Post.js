import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../common/Spinner';
import PostActions from './PostActions';
import { getSinglePost, deletePost } from '../../actions/post';

class Post extends Component {
  state = {
    isUserAuthourOfPost: false,
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

  addComment = () => {};

  deletePost = () => {
    if (this.state.isUserAuthourOfPost) {
      this.props.deletePost(this.props.post._id, this.props.history);
    }
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
          <PostActions
            isAuthor={this.state.isUserAuthourOfPost}
            onAddCommentClick={this.addComment}
            onDeleteClick={this.deletePost}
          />
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

export default connect(mapStateToProps, { getSinglePost, deletePost })(
  withRouter(Post)
);
