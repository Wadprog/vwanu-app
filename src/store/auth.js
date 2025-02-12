/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../config'
import * as action from './apiAction'
import { setHeader } from '../middleware/api'

// const registrationProcess = (user) => {
//   if (user === null) return 0;
//   if (user.users) return 3;
//   if (user.dob) return 2;
//   if (user.email) return 1;
//   return 0;
// };

const url = endpoints.LOG_IN
const registerUrl = endpoints.REGISTER
const userUrl = endpoints.USER
// const { EXPECTED_HEADER } = endpoints

// type SIGNUPSTEP= "CONFIRM_SIGN_UP" | "CONFIRM_EMAIL" | "CONFIRM_PHONE" | "CONFIRM_DOB" | "CONFIRM_USER" |"REGISTRATION_STEP"

// interface StateInterface {
//   loading: boolean
//   user: User
//   profile: Profile
//   token: string | null
//   boarded: boolean
//   registered: boolean
//   isSignUpComplete: boolean
//   signUpStep: SIGNUPSTEP
//   error: string | null
//   lastFetch: number | null
// }
const initialState = {
  loading: false,
  user: null,
  profile: null,
  lastFetch: null,
  token: null,
  error: null,
  boarded: false,
  registered: false,
  isSignUpComplete: false,
  nextAction: 'BOARDED',
  signUpStep: 'CONFIRM_SIGN_UP',
  authInitialState: null,
}

export const Auth = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authInitialState: (state, action) => {
      state.nextAction = action.payload
    },
    loginRequested: (state) => {
      state.loading = true
    },
    boarded: (state) => {
      state.boarded = true
    },
    registered: (state) => {
      state.registered = true
    },

    fullRes: (state) => {
      state.user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@mail.com',
        ProfilePicture: '',
      }
    },
    loginSucceed: (state, action) => {
      const { accessToken, ...user } = action.payload

      state.loading = false
      state.token = accessToken
      state.user = user
      state.lastFetch = Date.now()
      state.error = null
    },

    tLoginSucceed: (state, action) => {
      const { accessToken, ...user } = action.payload
      state.loading = false
      state.user = user
      state.token = accessToken
      state.lastFetch = Date.now()
      state.error = null
      // state.registrationProcess = registrationProcess(action.payload);
      // storage.set('auth', action.payload.token)
    },

    LoginFailed: (state, action) => {
      state.loading = false
      state.token = null
      state.error = action.payload
      state.registrationProcess = 0
    },
    LogOut: (state) => {
      state.loading = false
      state.token = null
      state.user = null
      // storage.remove('auth')
    },
    updateRequested: (state) => {
      state.error = null
      state.loading = true
    },
    updateSucceed: (state, action) => {
      state.error = null
      state.loading = false
      state.profile = action.payload
      state.lastFetch = Date.now()
    },
    updateFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const signUp = (newUser) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: 'auth/users',
      data: newUser,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  )
}
export const signIn = (credentials) => (dispatch) => {
  // const { lastFetch } = getState().authentication
  // if (lastFetch) {
  //   const diff = moment().diff(moment(lastFetch), 'minutes')
  //   if (diff < env.requestRateInMinutes && user !== null) return
  // }

  dispatch(
    action.apiCallBegan({
      url: `http://192.168.1.227:3000/users/?id=de5b`,
      // data: credentials,
      method: 'GET',
      onSuccess: Auth.actions.tLoginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  )
}

export const getProfile = () => (dispatch, state) => {
  const { user } = state().authentication
  if (!user) throw new Error('Please authenticate first')
  dispatch(
    action.apiCallBegan({
      url: `profile/users/${user.id}`,
      method: 'GET',
      onSuccess: Auth.actions.updateSucceed.type,
      onStart: Auth.actions.updateRequested.type,
      onError: Auth.actions.updateFailed.type,
    })
  )
}

export const updateUser = (changes) => (dispatch, state) => {
  const { user } = state().authentication
  dispatch(
    action.apiCallBegan({
      url: `profile/users/${user.id}`,
      data: changes,
      method: 'PATCH',
      onSuccess: Auth.actions.updateSucceed.type,
      onStart: Auth.actions.updateRequested.type,
      onError: Auth.actions.updateFailed.type,
    })
  )
}
export const forgotPassword = (values) => (dispatch, state) => {
  console.log({ values })
  dispatch()
}
export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut())
export const nextAction = (changes) => (dispatch) =>
  dispatch(Auth.actions.authInitialState(changes))
export const getCurrentUser = (state) => state.authentication
export const logged = Auth.actions.loginSucceed.type
export default Auth.reducer

export const boarded = () => (dispatch) => dispatch(Auth.actions.boarded())
export const registered = () => (dispatch) =>
  dispatch(Auth.actions.registered())
export const fullLogin = () => (dispatch) => dispatch(Auth.actions.fullRes())
