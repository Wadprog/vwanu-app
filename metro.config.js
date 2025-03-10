const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Add support for resolving `tailwindcss`
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  tailwindcss: require.resolve('tailwindcss'),
}

// Add support for JSON files (if not already included)
config.resolver.assetExts.push('json')

module.exports = config
