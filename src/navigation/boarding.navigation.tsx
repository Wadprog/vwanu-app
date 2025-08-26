import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import BoardingScreen from '../screens/Boarding'

const { Navigator, Screen } = createStackNavigator()

const Account = () => {
  return (
    <Navigator
      screenOptions={{
        title: '',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Screen name="My Account" component={BoardingScreen} />
    </Navigator>
  )
}

export default Account
