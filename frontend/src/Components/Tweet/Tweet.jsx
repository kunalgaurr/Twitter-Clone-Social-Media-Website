import React, { useEffect, useState } from 'react';
import {
  BsChatLeft,
  BsRepeat,
  BsHeart,
  BsBarChartLine,
  BsShare,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import './Tweet.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Comments } from '../Comments/Comments';

export const Tweet = ({ data }) => {
  const storedUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`/user/${data.userId}`);
      setUser(res.data);
    };
    fetchApi();
  }, [data]);

  const handleClick = async () => {
    await axios.put(`/tweet/${data._id}/like`, storedUser._id);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div id="tweet-container">
        <div id="tweet-left">
          <Link to={`/profile?username=${user.username}`}>
            <img src="/assets/person/1.jpg" alt="" id="tweet-user-img" />
          </Link>
        </div>
        <div id="tweet-right">
          <div id="tweet-top">
            <div id="tweet-top-left">
              <span id="tweet-user-name">{user.name}</span>
              <span id="tweet-user-username">@{user.username}</span>
              <span id="tweet-duration">4h ago</span>
            </div>
            <div id="tweet-top-right">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div id="tweet-middle">
            <span id="tweet-text">{data.desc}</span>
            <img src="/assets/post/1.jpg" alt="" id="tweet-image" />
          </div>
          <div id="tweet-bottom">
            <span className="tweet-option">
              <BsChatLeft
                onClick={() => {
                  setToggle(!toggle);
                }}
              />{' '}
              {data.comments.length}
            </span>
            <span className="tweet-option">
              <BsRepeat /> {data.shares.length}
            </span>
            <span className="tweet-option">
              <BsHeart
                onClick={handleClick}
                style={{ color: isLiked ? 'red' : 'white' }}
              />{' '}
              {data.likes.length}
            </span>
            <span className="tweet-option">
              <BsBarChartLine /> 00
            </span>
            <span className="tweet-option">
              <BsShare />
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: toggle ? 'block' : 'none' }}>
        <Comments />
      </div>
    </>
  );
};
