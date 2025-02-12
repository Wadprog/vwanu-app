import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react-native'

import Routes from './src/navigation'
import { store } from './src/store'
import theme from './tailwind.config'
import mapping from './src/mapping.json'
import amplifyconfig from './src/amplifyconfiguration.json'
import { AuthContextProvider } from './src/contexts/AuthContext'
import { ProfileContextProvider } from './src/contexts/ProfileContext'

Amplify.configure(amplifyconfig)

const App: React.FC = () => (
  <Provider store={store}>
    <ApplicationProvider
      {...eva}
      // @ts-ignore
      customMapping={mapping}
      theme={{ ...eva.light, ...theme.theme.extend.colors }}
    >
      <Authenticator.Provider>
        <AuthContextProvider>
          <ProfileContextProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </ProfileContextProvider>
        </AuthContextProvider>
      </Authenticator.Provider>
    </ApplicationProvider>
  </Provider>
)

const formFields = {
  name: {
    order: 1,
  },
  birthdate: {
    order: 2,
  },
  gender: {
    label: 'Gender',
    key: 'gender',
    isRequired: true,
    order: 3,
  },
  signUp: {
    email: {
      order: 4,
    },
    password: {
      order: 5,
    },
    confirm_password: {
      order: 6,
    },
  },
}

export default App
