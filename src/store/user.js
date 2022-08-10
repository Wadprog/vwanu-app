/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Core components
import * as action from './api';
import { endpoints } from '../config';
import { setHeader } from '../middleware/api';

// const userUrl = endpoints.USER
const registerUrl = endpoints.REGISTER;
const { EXPECTED_HEADER } = endpoints;

const initialState = {
  loading: false,
  user: null,
  lastFetch: null,
  token: null,
  error: null,
};

export const Auth = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.loading = true;
    },
    getUsersSucceed: (state, action) => {
      state.loading = false;
      state.token = action.payload.accessToken;
      setHeader(EXPECTED_HEADER, action.payload.token);
      state.user = action.payload;
      state.lastFetch = Date.now();
      // storage.set('auth', action.payload.token)
    },

    getUsersFailed: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    updateUser: (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
      // storage.remove('auth')
    },
  },
});

export const Register = (newUser) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: registerUrl,
      data: newUser,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};
export const Login = (credentials) => (dispatch) => {
  // const { lastFetch } = getState().authentication
  // if (lastFetch) {
  //   const diff = moment().diff(moment(lastFetch), 'minutes')
  //   if (diff < env.requestRateInMinutes && user !== null) return
  // }

  dispatch(
    action.apiCallBegan({
      url: '/authentication',
      data: credentials,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut());
export const getCurrentUser = (state) => state.authentication;
export const logged = Auth.actions.loginSucceed.type;
export default Auth.reducer;
