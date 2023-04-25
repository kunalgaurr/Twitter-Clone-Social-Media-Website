import React, { useRef } from 'react';
import {
  BsImages,
  BsFiletypeGif,
  BsCalendarDate,
  BsEmojiSmile,
  BsPinMap,
} from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import './NewTweet.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const NewTweet = () => {
  const user = useSelector((state) => state.auth.user);
  const desc = useRef();

  const handleSubmit = async () => {
    const tweet = {
      desc: desc.current.value,
      img: '',
      userId: user._id,
    };
    await axios.post('/tweet/post', tweet);
  };
  return (
    <div id="new-tweet-container">
      <div id="new-tweet-left">
        <img src="/assets/person/1.jpg" alt="" id="new-tweet-user-img" />
      </div>
      <form id="new-tweet-right" onSubmit={handleSubmit}>
        <div id="new-tweet-top">
          <input
            type="text"
            id="new-tweet-input"
            placeholder={`What on you mind ${user.name}?`}
            ref={desc}
          />
        </div>
        <div id="new-tweet-bottom">
          <div id="new-tweet-options">
            <BsImages />
            <BsFiletypeGif />
            <BiPoll />
            <BsEmojiSmile />
            <BsCalendarDate />
            <BsPinMap />
          </div>
          <button id="new-tweet-button" type="submit">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};
