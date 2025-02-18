export default {
  expo: {
    extra: {
      releaseChannel: process.env.RELEASE_CHANNEL || 'development',
      eas: {
        projectId: 'e550dc60-d34d-4c1d-8286-c670002c81d3',
      },
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/e550dc60-d34d-4c1d-8286-c670002c81d3',
    },
  },
}
