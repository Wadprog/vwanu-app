/* eslint-disable no-return-assign */
import axios from "axios";
import { Alert } from "react-native";
import * as actions from "../store/apiAction";
import env from "../config/environnement";

// eslint-disable-next-line consistent-return
const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { onSuccess, onError, onStart } = action.payload;

  if (onStart) store.dispatch({ type: onStart });
  next(action);
  console.log("env.apiUrl", env.apiUrl);
  try {
    const response = await axios({
      baseURL: env.apiUrl,
      ...action.payload,
    });

    store.dispatch({
      type: actions.apiCallSucceeded.type,
      payload: response.data,
    });
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    store.dispatch({
      type: actions.apiCallFailed.type,
      payload: error.message,
    });
    if (onError) store.dispatch({ type: onError, payload: error.message });
    Alert.alert("Error", error.message, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "OK", onPress: () => {} },
    ]);
  }
};

const Head = (headerKey, headerVal) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (axios.defaults.headers.common[headerKey] = headerVal);

export default api;
export const setHeader = Head;
