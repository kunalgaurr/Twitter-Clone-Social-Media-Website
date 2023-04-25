import { createSlice } from '@reduxjs/toolkit';

export const tweetSlice = createSlice({
  name: 'newTweet',
  initialState: {
    text: '',
    img: '',
  },
  reducers: {
    updateText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export default tweetSlice.reducer;
