import * as SecureStore from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// **Store Tokens Securely**
export const storeTokens = async (
  accessToken: string,
  refreshToken: string
) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken)
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
}

// **Get Stored Access Token**
export const getStoredAccessToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
}

// **Get Stored Refresh Token**
export const getStoredRefreshToken = async () => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

// **Remove Tokens on Logout**
export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}
