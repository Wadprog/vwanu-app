import React from 'react'
import * as eva from '@eva-design/eva'
import { Provider } from 'react-redux'
import { Amplify } from 'aws-amplify'
import { ApplicationProvider } from '@ui-kitten/components'
import { Authenticator } from '@aws-amplify/ui-react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import Routes from './src/navigation'
import { store } from './src/store'
import mapping from './src/mapping.json'
import amplifyconfig from './src/amplifyconfiguration.json'
import { MessageProvider } from './src/contexts/MessageContext'
import { ScrollProvider } from 'contexts/ScrollContext'
import { useTheme } from './src/hooks/useTheme'

Amplify.configure(amplifyconfig)

// Theme wrapper component that has access to Redux state
const ThemedApp: React.FC = () => {
  const { isDarkMode, currentTheme } = useTheme()

  // Create custom navigation theme
  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: currentTheme['background-basic-color-1'],
      card: currentTheme['background-basic-color-2'],
      text: currentTheme['text-basic-color'],
      border: currentTheme['border-basic-color-1'],
      primary: currentTheme['color-primary-500'],
    },
  }

  return (
    <ApplicationProvider
      {...eva}
      customMapping={mapping as any}
      theme={currentTheme}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Authenticator.Provider>
        <MessageProvider>
          <NavigationContainer theme={navigationTheme}>
            <ScrollProvider>
              <Routes />
            </ScrollProvider>
          </NavigationContainer>
        </MessageProvider>
      </Authenticator.Provider>
    </ApplicationProvider>
  )
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemedApp />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
