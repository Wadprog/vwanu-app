/* eslint-disable no-undef */
import constant from 'expo-constants'

type ReleaseChannel = 'development' | 'staging' | 'production'

const environnements: { [key in ReleaseChannel]: { apiUrl: string } } = {
  development: {
    apiUrl: 'http://api.vwanu.local/api/v1/',
    // apiUrl: "http://192.168.1.143/api/v1/",
  },
  staging: {
    apiUrl: 'https://staging-api.com',
  },
  production: {
    apiUrl: 'https://my-api.com',
  },
}
const releaseChannel =
  (constant.manifest?.releaseChannel as ReleaseChannel) || 'staging'

const getCurrentEnvironnement = (): { apiUrl: string } =>
  __DEV__ ? environnements.development : environnements[releaseChannel]

export default getCurrentEnvironnement()
