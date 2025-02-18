import React from 'react'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper'
import { getCurrentUser } from 'aws-amplify/auth'

// Navigation Stacks
import AppNavigation from './Drawer'
import AuthNavigator from './Auth.navigation'
import BoardingNavigator from './boarding.navigation'
import ProfileCreationNavigator from './updateuser.navigator'

import { RootState } from '../store'
import { NextCompletionStep } from '../../types.d'
import { NextActions } from '../store/auth-slice'
import { useFetchProfileQuery } from '../store/profiles'
import Screen from 'components/screen'
import { Text } from 'react-native'

const Routes: React.FC = () => {
  const { nextAction, token } = useSelector((state: RootState) => state.auth)

  const {
    data: profile,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useFetchProfileQuery('1', {
    skip: !token,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  })
  console.log('\n\n\n')
  console.log('[profile]', profile)
  console.log('\n')

  // Loading State
  if (isFetching || isLoading || error) {
    return (
      <Screen loading={isFetching || isLoading} error={null}>
        <Text>Loading Profile...</Text>
      </Screen>
    )
  }

  // Pre-Authentication Flow
  if (!token) {
    return nextAction === NextActions.BOARDED ? (
      <BoardingNavigator />
    ) : (
      <AuthNavigator />
    )
  }

  // Post-Authentication Flow
  if (profile) {
    switch (profile.nextCompletionStep) {
      case NextCompletionStep.PROFILE_COMPLETE:
        return <AppNavigation />
      default:
        return <ProfileCreationNavigator />
    }
  }

  return <ProfileCreationNavigator />
}

export default Routes
