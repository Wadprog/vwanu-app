import constants from "expo-constants";
// Custom exports
export { default as size } from "./size";
export { default as text } from "./text";
export { default as image } from "./image";
export { default as colors } from "./colors";

export enum endpoints {
  LOG_IN = "/auth",
  REGISTER = "/users",
  COUNTRIES = "/countries",
  STATES = "/states",
  CITIES = "/cities",
  INTERESTS = "/interests",
  USERS = "/users",
  POSTS = "/posts",
}

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
const environment = {
  development: {
    BASE_URL: "http://localhost:4000/",
    endpoints,
  },
  staging: {
    BASE_URL: process.env.api_url,
    endpoints,
  },
  production: {
    BASE_URL: process.env.api_url,
    endpoints,
  },
};
const getEnvironment = () => {
  if (__DEV__) return environment.development;
  if (constants.manifest?.releaseChannel === "staging")
    return environment.staging;
  return environment.production;
};

export default getEnvironment();
