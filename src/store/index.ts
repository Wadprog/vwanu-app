import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";
import api from "../middleware/api";
import logger from "../middleware/logger";
import api_slice from "./api-slice";
import authentication from "./auth";

export const store = configureStore({
  reducer: {
    authentication,
    [api_slice.reducerPath]: api_slice.reducer,
  },
  // devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api_slice.middleware)
      .concat(logger)
      .concat(api)
      .concat(thunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
