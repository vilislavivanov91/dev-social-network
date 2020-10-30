import React from 'react';
import CommentItem from './CommentItem';

import { connect } from 'react-redux';

const CommentList = ({ comments, deleteComment, currentLoggedInUser }) => {
  let displayComment;
  if (comments.length === 0) {
    displayComment = null;
  } else {
    displayComment = comments.map((comment) => (
      <CommentItem
        key={comment._id}
        comment={comment}
        onDeleteClicked={() => deleteComment(comment._id)}
        isUserAuthorOfComment={comment.user === currentLoggedInUser}
      />
    ));
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>Comments: </h2>
          {displayComment}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentLoggedInUser: state.auth.user.id,
});

export default connect(mapStateToProps)(CommentList);
