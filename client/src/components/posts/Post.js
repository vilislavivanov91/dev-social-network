import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../common/Spinner';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import { getSinglePost, deleteComment } from '../../actions/post';

class Post extends Component {
  state = {
    showCommentForm: false,
  };
  componentDidMount() {
    if (!this.props.match.params.postId) {
      this.props.history.push('/');
    }

    const postId = this.props.match.params.postId;
    this.props.getSinglePost(postId);
  }

  toggleShowCommentForm = () => {
    this.setState((state) => ({
      showCommentForm: !state.showCommentForm,
    }));
  };

  render() {
    let dispayPost;
    if (this.props.loading || Object.keys(this.props.post).length === 0) {
      dispayPost = <Spinner />;
    } else {
      dispayPost = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link to="/posts" className="btn btn-light mb-3 float-left">
                    Back To Posts
                  </Link>
                </div>
                <div className="col-6"></div>
              </div>

              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-10">
                    <p className="lead">{this.props.post.text}</p>
                    <p className="lead">by {this.props.post.userEmail}</p>
                    <p className="m-0">
                      Created at{' '}
                      <Moment data={this.props.post.date} format="DD/MM/YYYY" />
                    </p>
                  </div>
                </div>
              </div>

              {this.props.post.comments.length > 0 ? (
                <CommentList
                  comments={this.props.post.comments}
                  deleteComment={this.deleteComment}
                />
              ) : (
                <p>There is no comments yet</p>
              )}
              <button
                className="btn btn-primary my-1"
                onClick={this.toggleShowCommentForm}
              >
                Add comment
              </button>

              {this.state.showCommentForm && <CommentForm />}
              <hr />
            </div>
          </div>
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
  deleteComment,
})(withRouter(Post));
