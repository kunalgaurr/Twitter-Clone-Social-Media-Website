import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { NewTweet } from '../../Components/NewTweet/NewTweet';
import { Tweet } from '../../Components/Tweet/Tweet';
import { Topbar } from '../../Components/Topbar/Topbar';

import animation from '../../animation.svg';

export const Explore = () => {
  const [tweet, setTweet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('/tweet/all');
      await setTweet(res.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={animation} alt="" />
      </div>
    );
  }

  return (
    <Wrapper>
      <div id="explore-container">
        <Topbar title="Explore" />
        <NewTweet />
        {tweet
          .slice(0)
          .reverse()
          .map((t) => (
            <Tweet key={t._id} data={t} />
          ))}
      </div>
    </Wrapper>
  );
};
