import React from 'react';
import Moment from 'react-moment';

const CommentItem = ({ comment, onDeleteClicked, isUserAuthorOfComment }) => {
  return (
    <div className="border p-3 m-1">
      <p>{comment.text}</p>
      <p>by {comment.userEmail}</p>
      <p>
        Created at <Moment data={comment.date} format="DD/MM/YYYY" />
      </p>
      {isUserAuthorOfComment ? (
        <button onClick={onDeleteClicked}>Delete</button>
      ) : null}
    </div>
  );
};

export default CommentItem;
