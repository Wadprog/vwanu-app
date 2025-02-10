import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import { getCurrentUser, getProfile } from '../store/auth'
import { RegisterScreen } from '../screens/registrations'
import UpdateProfileNavigator from './updateuser.navigator'

const { Navigator, Screen } = createStackNavigator()

const RegisterNavigator = () => {
  const dispatch = useDispatch()
  const auth = useSelector(getCurrentUser)

  React.useEffect(() => {
    if (!auth.user) return

    // @ts-ignore
    dispatch(getProfile())
  }, [auth.user])

  // if(auth.loading) return null;
  if (!auth.user)
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="SignUp-" component={RegisterScreen} />
      </Navigator>
    )
  if (auth.profile) return <UpdateProfileNavigator />
}

export default RegisterNavigator
