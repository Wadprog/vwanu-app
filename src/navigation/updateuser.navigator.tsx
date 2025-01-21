import React from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import { getCurrentUser } from '../store/auth'
import {
  FindFriendScreen,
  MoreInfoScreen,
  ProfilePictureScreen,
} from '../screens/registrations'

const { Navigator, Screen } = createStackNavigator()

const RegisterNavigator = () => {
  const { profile } = useSelector(getCurrentUser)

  if (profile.dob)
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="tt" component={ProfilePictureScreen} />
        <Screen name="find" component={FindFriendScreen} />
      </Navigator>
    )
  else
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="more" component={MoreInfoScreen} />
      </Navigator>
    )
}

export default RegisterNavigator
