/* eslint-disable no-undef */
import constant from "expo-constants";

const environnements = {
  development: {
    apiUrl: "http://192.168.1.176:3000/",
  },
  staging: {
    apiUrl: "https://staging-api.com",
  },
  production: {
    apiUrl: "https://my-api.com",
  },
};
const getCurrentEnvironnement = () =>
  __DEV__
    ? environnements.development
    : environnements[constant.manifest.releaseChannel];

export default getCurrentEnvironnement();
