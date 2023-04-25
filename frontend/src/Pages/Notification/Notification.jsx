import React from 'react';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Notifications } from '../../Components/Notifications/Notifications';
import { Topbar } from '../../Components/Topbar/Topbar';

export const Notification = () => {
  return (
    <Wrapper>
      <div id="notification-container">
        <Topbar title="Notifications" />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
        <Notifications />
      </div>
    </Wrapper>
  );
};
