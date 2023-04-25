import axios from 'axios';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: LOGOUT };
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios.post('/user/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const logoutUser = (user) => async (dispatch) => {
  dispatch(logout());
  try {
    await axios.post(`user/logout/${user._id}`);
  } catch (error) {
    console.log(error);
  }
};

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
