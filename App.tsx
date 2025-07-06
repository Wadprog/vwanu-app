import React from 'react'
import * as eva from '@eva-design/eva'
import { Provider } from 'react-redux'
import { Amplify } from 'aws-amplify'
import { ApplicationProvider } from '@ui-kitten/components'
import { Authenticator } from '@aws-amplify/ui-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Routes from './src/navigation'
import { store } from './src/store'
import theme from './tailwind.config'
import mapping from './src/mapping.json'
import amplifyconfig from './src/amplifyconfiguration.json'
import { MessageProvider } from './src/contexts/MessageContext'
import { ScrollProvider } from 'contexts/ScrollContext'

Amplify.configure(amplifyconfig)

const App: React.FC = () => {
  const colors = theme?.theme?.extend?.colors || {}

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ApplicationProvider
          {...eva}
          customMapping={mapping as any}
          theme={{ ...eva.light, ...colors }}
        >
          <Authenticator.Provider>
            <MessageProvider>
              <NavigationContainer>
                <ScrollProvider>
                  <Routes />
                </ScrollProvider>
              </NavigationContainer>
            </MessageProvider>
          </Authenticator.Provider>
        </ApplicationProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
