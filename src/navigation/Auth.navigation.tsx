import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import routes from './routes'
import useAuthContext, { AuthState } from 'hooks/useAuthContext'

import SignInScreen from '../screens/Auth/SignIn.screen'
import SignUpScreen from '../screens/Auth/SignUp.screen'
import ResetPassword from '../screens/Auth/ResetPassword.screen'
import SignInOSignOut from '../screens/Auth/SignInOSignUp.screen'
import ForgetPassword from '../screens/Auth/ForgetPassword.screen'
import ConfirmSignUp from '../screens/Auth/ConfirmSignUp.screen'

export type AuthStackParamList = {
  [routes.SIGN_IN]: undefined
  [routes.SIGN_UP]: undefined
  [routes.RESET_PASSWORD]: undefined
  [routes.SIGN_IN_SIGN_UP]: undefined
  [routes.CONFIRM_SIGNUP]: undefined
  [routes.FORGET_PASSWORD]: undefined
}
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>
const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()

const AuthNavigator: React.FC<{}> = () => {
  console.log('AuthNavigator')
  const { nextAction } = useAuthContext()
  const navigation = useNavigation<AuthNavigationProp>()

  React.useEffect(() => {
    console.log({ nextAction })
    if (nextAction === AuthState.SIGNED_IN) {
      navigation.navigate(routes.SIGN_IN)
    }
    if (nextAction === AuthState.SIGNED_UP) {
      navigation.navigate(routes.SIGN_UP)
    }
    if (nextAction === AuthState.CONFIRMED_SIGNUP) {
      navigation.navigate(routes.CONFIRM_SIGNUP)
    }
    if (nextAction === AuthState.SIGNED_IN_SIGNED_UP) {
      navigation.navigate(routes.SIGN_IN_SIGN_UP)
    }
  }, [nextAction])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={routes.SIGN_IN_SIGN_UP} component={SignInOSignOut} />
      <Screen name={routes.SIGN_IN} component={SignInScreen} />
      <Screen name={routes.SIGN_UP} component={SignUpScreen} />
      <Screen name={routes.RESET_PASSWORD} component={ResetPassword} />
      <Screen name={routes.FORGET_PASSWORD} component={ForgetPassword} />
      <Screen name={routes.CONFIRM_SIGNUP} component={ConfirmSignUp} />
    </Navigator>
  )
}

export default AuthNavigator
