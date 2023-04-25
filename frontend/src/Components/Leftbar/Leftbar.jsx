import React from 'react';
import { Link } from 'react-router-dom';
import {
  RxTwitterLogo,
  RxHome,
  RxFrame,
  RxBell,
  RxBookmark,
  RxChatBubble,
  RxPerson,
  RxDotsVertical,
} from 'react-icons/rx';
import './Leftbar.css';
import { LeftbarUser } from '../LeftbarUser/LeftbarUser';
import { useSelector } from 'react-redux';

export const Leftbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div id="leftbar-container">
      <div id="leftbar-wrapper">
        <Link to="/" className="leftbar-item">
          <RxTwitterLogo />
        </Link>
        <Link to="/" className="leftbar-item">
          <RxHome />
          <span className="leftbar-text">Home</span>
        </Link>
        <Link to="/explore" className="leftbar-item">
          <RxFrame />
          <span className="leftbar-text">Explore</span>
        </Link>
        <Link to="/notification" className="leftbar-item">
          <RxBell />
          <span className="leftbar-text">Notification</span>
          <span className="bell"></span>
        </Link>
        <Link to="/bookmark" className="leftbar-item">
          <RxBookmark />
          <span className="leftbar-text">Bookmarks</span>
        </Link>
        <Link to="/message" className="leftbar-item">
          <RxChatBubble />
          <span className="leftbar-text">Messages</span>
          <span className="bell"></span>
        </Link>
        <Link to="/premium" className="leftbar-item">
          <RxTwitterLogo />
          <span className="leftbar-text">Premium</span>
        </Link>
        <Link
          to={`/profile?username=${user.username}`}
          className="leftbar-item"
        >
          <RxPerson />
          <span className="leftbar-text">Profile</span>
        </Link>
        <Link to="/more" className="leftbar-item">
          <RxDotsVertical />
          <span className="leftbar-text">More</span>
        </Link>
        <Link to="/new-tweet" id="leftbar-tweet-button">
          Tweet
        </Link>
        <div className="left-bar-logout-options">
          <LeftbarUser />
        </div>
      </div>
    </div>
  );
};
