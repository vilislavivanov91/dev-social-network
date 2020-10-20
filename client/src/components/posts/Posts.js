import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllPosts } from '../../actions/post';

class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    // check if loading or !this.props.post.allPosts - > render Spinner
    // else -> pass allPosts to PostItem
    return <div>Hello from Posts</div>;
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
