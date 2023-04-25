import React from 'react';
import { BsSend } from 'react-icons/bs';
import './ChatBox.css';
import { Topbar } from '../Topbar/Topbar';

export const ChatBox = () => {
  return (
    <div id="chatbox-container">
      <Topbar title="Harshit Rathi" />
      <div id="chat-options">
        <input type="text" id="chat-input" placeholder="Send Message..." />
        <div id="send-button">
          <BsSend />
        </div>
      </div>
    </div>
  );
};
