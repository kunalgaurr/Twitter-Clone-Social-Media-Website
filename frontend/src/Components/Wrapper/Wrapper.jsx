import React from 'react';
import { Leftbar } from '../Leftbar/Leftbar';
import { Rightbar } from '../Rightbar/Rightbar';
import './Wrapper.css';

const Wrapper = ({ children }) => {
  return (
    <div id="wrapper-container">
      <Leftbar />
      <div id="middle-section">{children}</div>
      <Rightbar />
    </div>
  );
};

export default Wrapper;
