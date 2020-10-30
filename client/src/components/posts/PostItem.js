import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PostActions from './PostActions';
import { deletePost, likePost, unlikePost } from '../../actions/post';

class PostItem extends Component {
  deletePost = () => {
    this.props.deletePost(this.props.post._id, this.props.history);
  };
  likePost = () => {
    this.props.likePost(this.props.post._id);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.post._id);
  };
  checkIfUserIsPostAuthor = (postId) => {
    const post = this.props.posts.find((post) => post._id === postId);
    return this.props.currentUserId === post.user;
  };
  checkIfUserLikedPost = (postId) => {
    const post = this.props.posts.find((post) => post._id === postId);
    const indexOfUserInLikesArr = post.likes.findIndex(
      (like) => like.user === this.props.currentUserId
    );
    return indexOfUserInLikesArr >= 0;
  };
  render() {
    const { post } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${post.userHandle}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                // src={post.avatar}
                alt=""
              />
              <br />
              <p className="text-center">{post.userEmail}</p>
            </Link>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <PostActions
              isAuthor={this.checkIfUserIsPostAuthor(post._id)}
              onDeleteClick={this.deletePost}
              onLikeClicked={this.likePost}
              onUnlikeClicked={this.unlikePost}
              likesCount={post.likes.length}
              isPostAlreadyLikedByCurrentUser={this.checkIfUserLikedPost(
                post._id
              )}
            />
            <Link to={`/post/${post._id}`} className="btn btn-info">
              See Comments
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserId: state.auth.user.id,
  posts: state.post.posts,
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  PostItem
);
