import React from 'react';
import { NewComment } from '../NewComment/NewComment';
import { Comment } from '../Comment/Comment';

export const Comments = () => {
  return (
    <div id="comments-container">
      <NewComment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};
