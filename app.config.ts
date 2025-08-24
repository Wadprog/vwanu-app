import { ConfigContext, ExpoConfig } from 'expo/config'
import { version } from './package.json'

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = 'e550dc60-d34d-4c1d-8286-c670002c81d3'
const PROJECT_SLUG = 'vwanu-app'
const OWNER = 'waddprog'

// App production config
const APP_NAME = 'Vwanu'
const BUNDLE_IDENTIFIER = 'com.webvitals.vwanu'
const PACKAGE_NAME = 'com.webvitals.vwanu'
const ICON = './assets/images/icons/iOS-Prod.png'
const ADAPTIVE_ICON = './assets/images/icons/Android-Prod.png'
const SCHEME = 'vwanu'

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('⚙️ Building app for environment:', process.env.APP_ENV)

  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as 'development' | 'preview' | 'production') ||
        'development'
    )
  // console.log("🔍 Config:", config);
  // console.log("🔍 Name:", name);

  return {
    ...config,
    name: name,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: '#ffffff',
      },
      package: packageName,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: 'metro',
      favicon: './assets/images/favicon.png',
    },

    owner: OWNER,
  }
  // expo: {
  //   extra: {
  //     releaseChannel: process.env.RELEASE_CHANNEL || 'development',
  //     eas: {
  //       projectId: 'e550dc60-d34d-4c1d-8286-c670002c81d3',
  //     },
  //   },
  //   runtimeVersion: '1.0.0',
  //   updates: {
  //     url: 'https://u.expo.dev/e550dc60-d34d-4c1d-8286-c670002c81d3',
  //   },
  //   ios: {
  //     bundleIdentifier: 'com.waddprog.vwanu-app',
  //   },
  //   android: {
  //     package: 'com.waddprog.vwanuapp',
  //   },
  // },
}
// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: 'development' | 'preview' | 'production'
) => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    }
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: './assets/images/icons/iOS-Prev.png',
      adaptiveIcon: './assets/images/icons/Android-Prev.png',
      scheme: `${SCHEME}-prev`,
    }
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: './assets/images/icons/iOS-Dev.png',
    adaptiveIcon: './assets/images/icons/Android-Dev.png',
    scheme: `${SCHEME}-dev`,
  }
}
