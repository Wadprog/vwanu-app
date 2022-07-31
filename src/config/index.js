import Constants from 'expo-constants';
// Custom exports
export { default as image } from './image';
export { default as size } from './size';
export { default as colors } from './colors';
export { default as text } from './text';

export const endpoints = {
  REGISTER: '/register',
  LOG_IN: '/auth',
  MARKET: '/market',
  STORE: '/store/',
  EXPECTED_HEADER: 'x-auth-token',
  MAKE_PAYMENT: '/payments',
};
const environment = {
  development: {
    BASE_URL: 'localhost:4000/',
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
  // eslint-disable-next-line no-undef
  if (__DEV__) return environment.development;
  if (Constants.manifest.releaseChannel === 'staging') {
    return environment.staging;
  }
  return environment.production;
};

export default getEnvironment();
