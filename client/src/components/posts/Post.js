import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../common/Spinner';
import { getSinglePost } from '../../actions/post';

class Post extends Component {
  componentDidMount() {
    if (!this.props.match.params.postId) {
      this.props.history.push('/');
    }

    const postId = this.props.match.params.postId;
    this.props.getSinglePost(postId);
  }

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
});

export default connect(mapStateToProps, { getSinglePost })(Post);
