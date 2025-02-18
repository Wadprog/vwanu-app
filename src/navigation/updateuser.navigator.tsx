import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import FindFriendScreen from 'screens/registrations/FindFriends'
import MoreInfoScreen from 'screens/registrations/MoreInfo.screen'
import ProfilePictureScreen from 'screens/registrations/ProfilePicture'
import { useFetchProfileQuery } from 'store/profiles'
import { NextCompletionStep } from '../../types.d'
import { RootState } from 'store'
import routes from './routes'

export type ProfileParamList = {
  [routes.MORE_INFO]: undefined
  [routes.FIND_FRIEND]: undefined
  [routes.PROFILE_PICTURE]: undefined
}
export type ProfileNavigationProp = NativeStackNavigationProp<ProfileParamList>

const { Navigator, Screen } = createStackNavigator<ProfileParamList>()

const RegisterNavigator = () => {
  console.log('RegisterNavigator')
  const { userId } = useSelector((state: RootState) => state.auth)

  const { data } = useFetchProfileQuery(userId!)

  const nextAction = data?.nextCompletionStep

  const navigation = useNavigation<ProfileNavigationProp>()
  React.useEffect(() => {
    if (nextAction === NextCompletionStep.FIND_FRIENDS) {
      navigation.navigate(routes.FIND_FRIEND)
    }
    if (nextAction === NextCompletionStep.PROFILE_PICTURE) {
      navigation.navigate(routes.PROFILE_PICTURE)
    }
    if (nextAction === NextCompletionStep.START) {
      navigation.navigate(routes.MORE_INFO)
    }
  }, [nextAction])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={routes.MORE_INFO} component={MoreInfoScreen} />
      <Screen name={routes.FIND_FRIEND} component={FindFriendScreen} />
      <Screen name={routes.PROFILE_PICTURE} component={ProfilePictureScreen} />
    </Navigator>
  )
}

export default RegisterNavigator
