import React from 'react';
import classnames from 'classnames';

const PostActions = ({
  isAuthor,
  onDeleteClick,
  onLikeClicked,
  onUnlikeClicked,
  likesCount,
  isPostAlreadyLikedByCurrentUser,
}) => {
  return (
    <span>
      <br />
      {isAuthor && (
        <button className="btn btn-danger mr-1" onClick={onDeleteClick}>
          <i className="fas fa-times" />
        </button>
      )}
      <button
        disabled={isPostAlreadyLikedByCurrentUser}
        className="btn btn-light mr-1"
        onClick={onLikeClicked}
      >
        <i
          className={classnames('fas fa-thumbs-up', {
            'text-info': isPostAlreadyLikedByCurrentUser,
          })}
        />
        <span className="badge badge-light">{likesCount}</span>
      </button>
      <button className="btn btn-light mr-1" onClick={onUnlikeClicked}>
        <i className="text-secondary fas fa-thumbs-down" />
      </button>
    </span>
  );
};

export default PostActions;
