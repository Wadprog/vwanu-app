/* eslint-disable no-undef */
import Constants from 'expo-constants'

type ReleaseChannel = 'development' | 'staging' | 'production'

const environnement: { [key in ReleaseChannel]: { apiUrl: string } } = {
  development: {
    apiUrl: 'https://devy.vwanu.com/api/v1/',
  },
  staging: {
    apiUrl: 'https://staging.vwanu.com/api/v1/',
  },
  production: {
    apiUrl: 'https://api.vwanu.com/api/v1/',
  },
}

const getEnvironment = (): { apiUrl: string } => {
  if (__DEV__) return environnement.development

  // Get the release channel from Expo
  const channel = Constants.expoConfig?.extra?.releaseChannel as ReleaseChannel

  // If no release channel is set, default to staging
  if (!channel) return environnement.development

  // Return environment based on the release channel
  return environnement[channel]
}

export default getEnvironment()
