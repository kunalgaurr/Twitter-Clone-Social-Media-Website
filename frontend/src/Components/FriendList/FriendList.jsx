import React from 'react';
import { Friend } from '../Friend/Friend';
import './FriendList.css';

export const FriendList = () => {
  return (
    <div id="friend-list-container">
      <div id="friend-search">
        <input
          type="text"
          id="friend-search-input"
          placeholder="Search for users"
        />
      </div>
      <div id="friend-list">
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </div>
    </div>
  );
};
