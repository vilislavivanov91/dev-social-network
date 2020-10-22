import React from 'react';

const PostActions = ({ isAuthor, onDeleteClick, onAddCommentClick }) => {
  return (
    <div>
      <button onClick={onAddCommentClick}>Add comment</button>
      {isAuthor && <button onClick={onDeleteClick}>Delete</button>}
    </div>
  );
};

export default PostActions;
