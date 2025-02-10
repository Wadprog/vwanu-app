/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import AppNavigation from './Drawer'
import AuthNavigator from './auth.navigation'
// import * as storage from '../lib/secureCache'
import BoardingNavigator from './boarding.navigation'
import ProfileCreationNavigator from './updateuser.navigator'
import useAuthContext, { AuthState } from 'hooks/useAuthContext'
import useProfileContext, { ProfileCreateSteps } from 'hooks/useProfileContext'
import { ActivityIndicator } from 'react-native-paper'

const Routes: React.FC<{}> = () => {
  const { dispatch, ...authState } = useAuthContext()
  const { getProfile, ...profileState } = useProfileContext()
  const [isLoading, setIsLoading] = React.useState(true)

  const restoreUser = async () => {
    console.log({ a: authState.nextAction, p: profileState.nextAction })
    if (authState.nextAction === AuthState.AUTH_COMPLITED) {
      if (profileState.nextAction === ProfileCreateSteps.PROFILE_COMPLETE) {
        setIsLoading(false)
      }
      if (profileState.nextAction === ProfileCreateSteps.START) {
        await getProfile()
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    restoreUser()
  }, [authState.nextAction, profileState.nextAction])

  if (isLoading)
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    )

  if (authState.nextAction === AuthState.BOARDED) {
    return <BoardingNavigator />
  }
  if (
    authState.nextAction === AuthState.SIGNED_IN ||
    authState.nextAction === AuthState.CONFIRMED_SIGNUP ||
    authState.nextAction === AuthState.SIGNED_UP ||
    authState.nextAction === AuthState.SIGNED_IN_SIGNED_UP
  ) {
    return <AuthNavigator />
  }

  if (
    authState.nextAction === AuthState.AUTH_COMPLITED &&
    profileState.nextAction !== ProfileCreateSteps.PROFILE_COMPLETE
  ) {
    return <ProfileCreationNavigator />
  }
  if (
    authState.nextAction === AuthState.AUTH_COMPLITED &&
    profileState.nextAction === ProfileCreateSteps.PROFILE_COMPLETE
  ) {
    return <AppNavigation />
  }
}

export default Routes
