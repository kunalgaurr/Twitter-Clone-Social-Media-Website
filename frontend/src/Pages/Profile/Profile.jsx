import React from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Wrapper from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { ProfileNavbar } from '../../Components/ProfileNavbar/ProfileNavbar';

import animation from '../../animation.svg';

import './Profile.css';

export const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const username = new URLSearchParams(location.search).get('username');
  const storedUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
      setLoading(false);
    };
    fetchApi();
  }, [username]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={animation} alt="" />
      </div>
    );
  }
  console.log(`Follower Id = ${storedUser._id}`);

  const handleClick = async (e) => {
    const followerId = new mongoose.Types.ObjectId(storedUser._id);
    await axios.put(`/user/${user._id}/follow`, { followerId });
    window.location.reload();
  };

  return (
    <Wrapper>
      <div id="profile-wrapper">
        <Topbar
          title={user.name}
          text={`${user.tweets && user.tweets.length} tweets`}
        />
        <div id="profile-cover">
          <img src="/assets/post/1.jpg" alt="" id="profile-cover-img" />
          <div id="profile-img">
            <img src="/assets/person/1.jpg" alt="" id="profile-main-img" />
            <div className="profile-buttons">
              {storedUser.username === user.username ? (
                <button id="edit-profile-button">Edit Profile</button>
              ) : (
                <button id="follow-button" onClick={handleClick}>
                  {user.followers.includes(storedUser._id)
                    ? 'Unfollow'
                    : 'Follow'}{' '}
                  @{user.username}
                </button>
              )}
            </div>
          </div>
        </div>
        <div id="profile-info">
          <span id="profile-user-name">{user.name}</span>
          <span id="profile-user-username">@{user.username}</span>
          <span id="profile-user-desc">{user.desc}</span>
          <div>
            <span id="profile-user-birth">{}</span>
            <span id="profile-user-join">2 weeks ago</span>
          </div>
          <div>
            <span id="profile-user-follower">
              {user.followers && user.followers.length} followers
            </span>
            <span id="profile-user-following">
              {user.following && user.following.length} followings
            </span>
          </div>
        </div>
        <ProfileNavbar />
      </div>
    </Wrapper>
  );
};
