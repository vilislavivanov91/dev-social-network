import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
  let displayComment;
  if (comments.length === 0) {
    displayComment = null;
  } else {
    displayComment = comments.map((comment) => (
      <CommentItem key={comment._id} comment={comment} />
    ));
  }
  return (
    <div>
      <h2>Comments: </h2>
      {displayComment}
    </div>
  );
};

export default CommentList;
