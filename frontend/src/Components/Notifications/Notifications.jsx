import React from 'react';
import './Notifications.css';

export const Notifications = () => {
  return (
    <div id="notifications-container">
      <img src="/assets/person/1.jpg" alt="" id="notification-image" />
      <span id="notification-text">
        <span>Harshit Rathi</span> started following you
      </span>
      <span id="notification-duration">4h ago</span>
    </div>
  );
};
