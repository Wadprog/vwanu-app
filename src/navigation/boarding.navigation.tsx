import React from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'

import tw from '../lib/tailwind'
import Text from '../components/Text'
import BoardingScreen from '../screens/Boarding'
import { setNextAction, NextActions } from 'store/auth-slice'

const { Navigator, Screen } = createStackNavigator()

const Account = () => {
  const dispatch = useDispatch()
  return (
    <Navigator
      screenOptions={{
        title: '',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerRight: () => (
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => {
              console.log('Skip')
              dispatch(setNextAction(NextActions.SIGNED_IN_SIGNED_UP))
            }}
          >
            <Text appearance="hint">Skip</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={tw.color('gray-500')}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Screen name="My Account" component={BoardingScreen} />
    </Navigator>
  )
}

export default Account
