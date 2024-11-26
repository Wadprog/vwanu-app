/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../config";
import * as action from "./apiAction";
import { setHeader } from "../middleware/api";

const registrationProcess = (user) => {
  if (user === null) return 0;
  if (user.users) return 3;
  if (user.dob) return 2;
  if (user.email) return 1;
  return 0;
};

const url = endpoints.LOG_IN;
const registerUrl = endpoints.REGISTER;
const userUrl = endpoints.USER;
// const { EXPECTED_HEADER } = endpoints

const initialState = {
  loading: false,
  user: null,
  lastFetch: null,
  token: null,
  error: null,
  boarded: false,
  registrationProcess: 0,
};

export const Auth = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true;
    },
    boarded: (state) => {
      state.boarded = true;
    },

    fullRes: (state) => {
      state.user = {
        firstName: "John",
        lastName: "Doe",
        email: "email@mail.com",
        ProfilePicture: "",
      };
    },
    loginSucceed: (state, action) => {
      state.loading = false;
      // state.token = action.payload.accessToken
      // setHeader('authorization', action.payload.accessToken)
      state.user = action.payload;
      state.lastFetch = Date.now();
      state.error = null;
      state.registrationProcess = registrationProcess(action.payload);
      // storage.set('auth', action.payload.token)
    },

    tLoginSucceed: (state, action) => {
      state.loading = false;
      state.user = action.payload[0];
      state.lastFetch = Date.now();
      state.error = null;
      state.registrationProcess = registrationProcess(action.payload);
      // storage.set('auth', action.payload.token)
    },

    LoginFailed: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
      state.registrationProcess = 0;
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
      state.registrationProcess = registrationProcess(action.payload);
    },
    updateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const register = (newUser) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: registerUrl,
      data: newUser,
      method: "POST",
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};
export const login = (credentials) => (dispatch) => {
  // const { lastFetch } = getState().authentication
  // if (lastFetch) {
  //   const diff = moment().diff(moment(lastFetch), 'minutes')
  //   if (diff < env.requestRateInMinutes && user !== null) return
  // }

  dispatch(
    action.apiCallBegan({
      url: `http://192.168.1.227:3000/users/?id=de5b`,
      // data: credentials,
      method: "GET",
      onSuccess: Auth.actions.tLoginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};
export const updateUser = (changes) => (dispatch, state) => {
  const { user } = state().authentication;
  dispatch(
    action.apiCallBegan({
      url: `/users/${user.id}`,
      data: changes,
      method: "PATCH",
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

export const boarded = () => (dispatch) => dispatch(Auth.actions.boarded());
export const fullLogin = () => (dispatch) => dispatch(Auth.actions.fullRes());
