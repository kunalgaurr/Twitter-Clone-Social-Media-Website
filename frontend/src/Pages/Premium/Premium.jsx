import React from 'react';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import './Premium.css';

export const Premium = () => {
  return (
    <Wrapper>
      <div className="premium-container">
        <Topbar title="Twitter Premium" />
        <div id="premium-header">
          <span id="premium-heading">
            Blue subscribers with a verified phone number will get a blue
            checkmark once approved.
          </span>
          <img src="/assets/blue-tick.png" alt="" id="twitter-premium-img" />
        </div>
        <div id="premium-terms">
          <ul>
            <li>Ranking boost in replies and search</li>
            <li>
              See approximately twice as many Tweets between ads in your For You
              and Following timelines.
            </li>
            <li>Post longer videos and 1080p video uploads</li>
            <li>
              All the existing Blue features, including Edit Tweet, Bookmark
              Folders and early access to new features
            </li>
          </ul>
          <button id="twitter-premium-button">
            Buy Twitter Premium for $17.99
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
