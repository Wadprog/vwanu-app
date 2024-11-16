import api_slice from "./api-slice";
import authentication from "./auth";

// export default combineReducers({
//     address,
//     authentication,

// });

const reducers = {
  authentication,
  [api_slice.reducerPath]: api_slice.reducer,
};

export default reducers;
