import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { useSelector, useDispatch } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper'

// Navigation Stacks
import AppNavigation from './Drawer'
import AuthNavigator from './Auth.navigation'
import BoardingNavigator from './boarding.navigation'
import ProfileCreationNavigator from './updateuser.navigator'

import tw from '../lib/tailwind'
import { RootState, AppDispatch } from '../store'
import Screen from 'components/screen'
import { NextCompletionStep } from '../../types.d'
import { useFetchProfileQuery } from '../store/profiles'
import { NextActions, checkExistingSession } from '../store/auth-slice'

// Add this interface at the top of the file, after the imports
interface GeneralError {
  className: string
  code: number
  message: string
  name: string
}

const Routes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { nextAction, token, idToken, userId } = useSelector(
    (state: RootState) => state.auth
  )

  // Check for existing Cognito session when the app starts
  useEffect(() => {
    dispatch(checkExistingSession())
  }, [dispatch])

  // Add debug logging
  useEffect(() => {
    console.log('Auth State:', { token, idToken, userId, nextAction })
  }, [token, idToken, userId, nextAction])

  const {
    data: profile,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useFetchProfileQuery(userId || '', {
    skip: !token || !idToken || !userId,
    refetchOnMountOrArgChange: true,
  })

  // Add debug logging for profile
  useEffect(() => {
    if (error) {
      console.log('Profile Error:', error)
    }
    if (profile) {
      console.log('Profile Data:', profile)
    }
  }, [profile, error])

  // Loading State
  if (isFetching || isLoading || error) {
    const errorMessage =
      error &&
      ('error' in error
        ? {
            message: 'Network error. Please check your internet connection.',
            onRetry: refetch,
            retryText: 'Try Again',
          }
        : 'data' in error &&
          (error.data as GeneralError)?.className === 'general-error'
        ? {
            message: 'Unable to connect to database. Please try again later.',
            onRetry: refetch,
            retryText: 'Retry Connection',
          }
        : null)

    return (
      <Screen loading={isFetching || isLoading} error={errorMessage}>
        {error ? (
          <Layout style={tw`flex-1 justify-center items-center p-4`}>
            <Text style={tw`text-lg text-gray-600 mb-4 text-center`}>
              {'data' in error &&
              (error.data as GeneralError)?.className === 'general-error'
                ? 'We are having trouble connecting to our database. Our team has been notified and is working on it.'
                : 'Unable to load your profile. Please check your connection and try again.'}
            </Text>
          </Layout>
        ) : (
          <Text>Loading Profile...</Text>
        )}
      </Screen>
    )
  }

  // Pre-Authentication Flow
  if (!token || !idToken) {
    // If we're still checking for existing session, show a loading screen
    if (nextAction === NextActions.INITIALIZING) {
      return (
        <Screen>
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" animating={true} />
            <Text style={tw`mt-4`}>Checking session...</Text>
          </View>
        </Screen>
      )
    }
    return nextAction === NextActions.BOARDED ? (
      <BoardingNavigator />
    ) : (
      <AuthNavigator />
    )
  }

  // Post-Authentication Flow
  if (profile) {
    switch (parseInt(profile.nextCompletionStep || '0')) {
      case NextCompletionStep.PROFILE_COMPLETE:
        return <AppNavigation />
      default:
        return <ProfileCreationNavigator />
    }
  }

  return <ProfileCreationNavigator />
}

export default Routes
