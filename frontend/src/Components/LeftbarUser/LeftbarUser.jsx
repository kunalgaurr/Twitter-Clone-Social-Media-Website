import React, { useState } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import './LeftbarUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/authReducer';
import { useNavigate } from 'react-router-dom';

export const LeftbarUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser(user));
    navigate('/login');
  };
  return (
    <div id="leftbar-user-container" onClick={handleClick}>
      <img src="/assets/person/1.jpg" alt="" id="leftbar-user-img" />
      <div id="leftbar-user-info">
        <span id="leftbar-user-name">{user.name}</span>
        <span id="leftbar-user-username">@{user.username}</span>
      </div>
      <RxDotsVertical />
      <div id="logout-button" style={{ display: toggle ? 'block' : 'none' }}>
        <span onClick={handleLogout}>Log out of {user.username}</span>
      </div>
    </div>
  );
};
