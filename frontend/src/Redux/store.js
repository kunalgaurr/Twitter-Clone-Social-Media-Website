import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authReducer';
import thunk from 'redux-thunk';
import tweetReducer from './tweetSlice';

const rootReducers = combineReducers({
  tweet: tweetReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export default store;
