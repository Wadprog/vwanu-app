export { default as size } from "./size";
export { default as text } from "./text";
export { default as image } from "./image";
export { default as colors } from "./colors";
import environnement from "./environnement";

export enum endpoints {
  BLOG = "/blogs",
  LOG_IN = "/auth",
  REGISTER = "/users",
  COUNTRIES = "/countries",
  STATES = "/states",
  CITIES = "/cities",
  INTERESTS = "/interests",
  USERS = "/users",
  POSTS = "/posts",
  COMMUNITY = "/commmunities",
  BANNER = "/banners",
  COMMENTS = "/comments",
}
export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const getEnvironment = () => {
  return Object.assign(endpoints, environnement);
};

export default getEnvironment();
