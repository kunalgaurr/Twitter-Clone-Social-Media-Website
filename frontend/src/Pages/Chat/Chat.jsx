import React from 'react';
import { Leftbar } from '../../Components/Leftbar/Leftbar';
import { ChatBox } from '../../Components/ChatBox/ChatBox';
import { FriendList } from '../../Components/FriendList/FriendList';
import './Chat.css';

export const Chat = () => {
  return (
    <div id="chat-container">
      <Leftbar />
      <ChatBox />
      <FriendList />
    </div>
  );
};
