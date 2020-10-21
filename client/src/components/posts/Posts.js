import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getAllPosts } from '../../actions/post';

class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    // check if loading or !this.props.post.allPosts - > render Spinner
    // else -> pass allPosts to PostItem
    let dispayPosts;
    if (this.props.loading || !this.props.posts) {
      dispayPosts = <Spinner />;
    } else if (this.props.posts.length === 0) {
      dispayPosts = <p>There is no posts</p>;
    } else {
      dispayPosts = this.props.posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ));
    }

    return (
      <div>
        <PostForm />
        {dispayPosts}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading,
  errors: state.errors,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
