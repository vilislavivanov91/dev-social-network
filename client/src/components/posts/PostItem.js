import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostItem = ({ post }) => {
  return (
    <div>
      <Link to={`/post/${post._id}`}>
        <p>{post.text}</p>
      </Link>
      {/* <Link to={`/profile/${post.handle}`}> */}
      <p>by {post.userEmail}</p>
      {/* </Link> */}

      <p>
        Created at <Moment data={post.date} format="DD/MM/YYYY" />
      </p>
      <hr />
    </div>
  );
};

export default PostItem;
