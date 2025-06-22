import React from 'react'
import * as eva from '@eva-design/eva'
import { Provider } from 'react-redux'
import { Amplify } from 'aws-amplify'
import { ApplicationProvider } from '@ui-kitten/components'
import { Authenticator } from '@aws-amplify/ui-react-native'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/navigation'
import { store } from './src/store'
import theme from './tailwind.config'
import mapping from './src/mapping.json'
import amplifyconfig from './src/amplifyconfiguration.json'
import { MessageProvider } from './src/contexts/MessageContext'
import { ScrollProvider } from 'contexts/ScrollContext'

Amplify.configure(amplifyconfig)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider
        {...eva}
        customMapping={mapping as any}
        theme={{ ...eva.light, ...theme.theme.extend.colors }}
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
    </Provider>
  )
}

export default App
