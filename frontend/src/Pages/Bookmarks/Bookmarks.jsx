import React from 'react';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { Tweet } from '../../Components/Tweet/Tweet';

export const Bookmarks = () => {
  return (
    <Wrapper>
      <div id="bookmarks-container">
        <Topbar title="Bookmarks" text="@kunalgaur" />
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
      </div>
    </Wrapper>
  );
};
