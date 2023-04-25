import React from 'react';
import './rightbarUser.css';
import { Link } from 'react-router-dom';

export const RightbarUser = ({ data }) => {
  return (
    <Link
      id="rightbar-user-container"
      to={`/profile?username=${data.username}`}
    >
      <img src="/assets/person/1.jpg" alt="" id="rightbar-user-img" />
      <div id="rightbar-user-info">
        <span id="rightbar-user-name">{data.name}</span>
        <span id="rightbar-user-username">@{data.username}</span>
      </div>
      <span id="rightbar-follow-button">Follow</span>
    </Link>
  );
};
