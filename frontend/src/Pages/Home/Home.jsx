import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Wrapper from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { NewTweet } from '../../Components/NewTweet/NewTweet';
import { Tweet } from '../../Components/Tweet/Tweet';

import animation from '../../animation.svg';

export const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const [tweet, setTweet] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`/tweet/${user._id}/home`);
      setTweet(res.data);
      setLoading(false);
    };
    fetchApi();
  }, [user]);

  console.log(user);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={animation} alt="" />
      </div>
    );
  }
  const sortedTweets = tweet.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Wrapper>
      <Topbar title="Home" text={`${sortedTweets.length} Tweets`} />
      <NewTweet />
      {sortedTweets.map((t) => (
        <Tweet data={t} key={t._id} />
      ))}
    </Wrapper>
  );
};
