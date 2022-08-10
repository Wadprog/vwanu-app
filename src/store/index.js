/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

// import logger from '../middleware/logger'
import api from '../middleware/api';

export const store = configureStore({
  reducer,
  middleware: [thunkMiddleware, api],
});
