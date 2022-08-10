/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { endpoints } from '../config';
import * as action from './api';
import { setHeader } from '../middleware/api';

const url = endpoints.LOG_IN;
const registerUrl = endpoints.REGISTER;
// const { EXPECTED_HEADER } = endpoints
const { log, table } = console;

const initialState = {
  loading: false,
  user: null,
  lastFetch: null,
  token: null,
  error: null,
};

export const Auth = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true;
    },
    loginSucceed: (state, action) => {
      state.loading = false;
      state.token = action.payload.accessToken;
      setHeader('authorization', action.payload.accessToken);
      state.user = action.payload;
      state.lastFetch = Date.now();
      // storage.set('auth', action.payload.token)
    },

    LoginFailed: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    LogOut: (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
      // storage.remove('auth')
    },
    updateRequested: (state) => {
      state.loading = true;
    },
    updateSucceed: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.lastFetch = Date.now();
    },
    updateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const Register = (newUser) => (dispatch) => {
  log('Register');
  table({ ...newUser });
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
      url,
      data: credentials,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};
export const UpdateUser = (changes) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: '/users',
      data: changes,
      method: 'PATCH',
      onSuccess: Auth.actions.updateSucceed.type,
      onStart: Auth.actions.updateRequested.type,
      onError: Auth.actions.updateFailed.type,
    })
  );
};
export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut());
export const getCurrentUser = (state) => state.authentication;
export const logged = Auth.actions.loginSucceed.type;
export default Auth.reducer;
