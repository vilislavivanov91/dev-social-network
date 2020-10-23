import React from 'react';

const PostActions = ({
  isAuthor,
  onDeleteClick,
  onAddCommentClick,
  onLikeClicked,
  onUnlikeClicked,
}) => {
  return (
    <div>
      <button onClick={onAddCommentClick}>Add comment</button>
      {isAuthor && <button onClick={onDeleteClick}>Delete</button>}
      <button onClick={onLikeClicked}>Like</button>
      <button onClick={onUnlikeClicked}>Unlike</button>
    </div>
  );
};

export default PostActions;
