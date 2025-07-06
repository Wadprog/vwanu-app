import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './reducer'
import { setupListeners } from '@reduxjs/toolkit/query'

import api from '../middleware/api'
import logger from '../middleware/logger'
import api_slice from './api-slice'
import authentication from './auth'
import authReducer, { AuthSessionService } from './auth-slice'
// import profileReducer from './profile-slice'
import profileReducer from './profiles'
import { uiReducer } from './ui-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    [api_slice.reducerPath]: api_slice.reducer,
    ui: uiReducer,
  },
  devTools: false,
  //@ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api_slice.middleware)
      .concat(logger)
      .concat(api)
      .concat(thunkMiddleware),
  // @ts-ignore
  enhancers: [devToolsEnhancer({ trace: true })],
})

// Initialize AuthSessionService with store's dispatch
AuthSessionService.setDispatch(store.dispatch)

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
