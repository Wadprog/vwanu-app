/* eslint-disable no-undef */
import Constants from 'expo-constants'
import { Platform } from 'react-native'

export type Environment = 'local' | 'development' | 'staging' | 'production'

interface EnvironmentConfig {
  apiUrl: string
  websocketUrl?: string
  timeout?: number
  apiKey?: string
}

const ENV = {
  local: {
    apiUrl:
      Platform.select({
        ios: 'https://vwanu-api-dev.webvitals.org',
        android: 'http://10.0.2.2:3000/api/v1/', // Special case for Android emulator
      }) || 'http://localhost:3000/api/v1/',
    timeout: 10000,
  },
  development: {
    apiUrl: 'https://dev.vwanu.com/api/v1/',
    timeout: 15000,
  },
  staging: {
    apiUrl: 'https://staging.vwanu.com/api/v1/',
    timeout: 15000,
  },
  production: {
    apiUrl: 'https://api.vwanu.com/api/v1/',
    timeout: 30000,
  },
} as const satisfies Record<Environment, EnvironmentConfig>

function getEnvironment(): EnvironmentConfig {
  // Check if running in development mode
  if (__DEV__) {
    // You can override this using environment variables or other means
    const forcedEnv = process.env.EXPO_PUBLIC_FORCE_ENV as Environment
    if (forcedEnv && forcedEnv in ENV) {
      return ENV[forcedEnv]
    }
    return ENV.local
  }

  // Get the release channel from Expo
  const channel = Constants.expoConfig?.extra?.releaseChannel as Environment

  // Default to production if no channel is set in production mode
  if (!channel) {
    console.warn('No release channel set, defaulting to production')
    return ENV.production
  }

  // Validate that the channel exists in our config
  if (!(channel in ENV)) {
    console.warn(
      `Invalid release channel "${channel}", defaulting to production`
    )
    return ENV.production
  }

  return ENV[channel]
}

const currentEnv = getEnvironment()

// For debugging
if (__DEV__) {
  console.log('Current environment:', {
    isDev: __DEV__,
    releaseChannel: Constants.expoConfig?.extra?.releaseChannel,
    apiUrl: currentEnv.apiUrl,
  })
}

export default currentEnv
