import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import './Topbar.css';

export const Topbar = (props) => {
  return (
    <div id="topbar-container">
      <Link to="../" id="topbar-link">
        <BsArrowLeft />
      </Link>
      <div id="topbar-wrapper">
        <span id="topbar-title">{props.title}</span>
        <span id="topbar-text">{props.text}</span>
      </div>
    </div>
  );
};
