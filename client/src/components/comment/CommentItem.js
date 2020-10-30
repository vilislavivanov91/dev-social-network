import React from 'react';
import Moment from 'react-moment';

const CommentItem = ({ comment, onDeleteClicked, isUserAuthorOfComment }) => {
  return (
    <div className="border p-3 m-1">
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            <p className="lead">by {comment.userEmail}</p>
            <p className="m-0">
              Date <Moment data={comment.date} format="DD/MM/YYYY" />
            </p>
          </div>
        </div>
      </div>

      {isUserAuthorOfComment && (
        <button className="btn btn-danger mr-1" onClick={onDeleteClicked}>
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  );
};

export default CommentItem;
