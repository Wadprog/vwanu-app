import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import routes from './routes'
import { RootState } from '../store'

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
import { NextActions } from '../store/auth-slice'

const AuthNavigator: React.FC<{}> = () => {
  const { nextAction } = useSelector((state: RootState) => state.auth)
  const navigation = useNavigation<AuthNavigationProp>()

  React.useEffect(() => {
    console.log({ nextAction })
    if (nextAction === NextActions.SIGNED_IN) {
      navigation.navigate(routes.SIGN_IN)
    }
    if (nextAction === NextActions.SIGNED_UP) {
      navigation.navigate(routes.SIGN_UP)
    }
    if (nextAction === NextActions.CONFIRMED_SIGNUP) {
      navigation.navigate(routes.CONFIRM_SIGNUP)
    }
    if (nextAction === NextActions.RESET_PASSWORD) {
      navigation.navigate(routes.RESET_PASSWORD)
    }
    if (nextAction === NextActions.SIGNED_IN_SIGNED_UP) {
      navigation.navigate(routes.SIGN_IN_SIGN_UP)
    }
    if (nextAction === NextActions.FORGOT_PASSWORD) {
      navigation.navigate(routes.FORGET_PASSWORD)
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
