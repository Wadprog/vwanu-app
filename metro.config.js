const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Custom resolver for tailwindcss
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => {
      if (name === 'tailwindcss') {
        return path.join(__dirname, 'node_modules/tailwindcss')
      }
      return path.join(__dirname, `node_modules/${name}`)
    },
  }
)

module.exports = config
