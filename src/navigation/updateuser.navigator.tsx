import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import FindFriendScreen from 'screens/registrations/FindFriends'
import MoreInfoScreen from 'screens/registrations/MoreInfo.screen'
import ProfilePictureScreen from 'screens/registrations/ProfilePicture'
import useProfileContext, { ProfileCreateSteps } from 'hooks/useProfileContext'

import routes from './routes'

export type ProfileParamList = {
  [routes.MORE_INFO]: undefined
  [routes.FIND_FRIEND]: undefined
  [routes.PROFILE_PICTURE]: undefined
}
export type ProfileNavigationProp = NativeStackNavigationProp<ProfileParamList>

const { Navigator, Screen } = createStackNavigator<ProfileParamList>()

const RegisterNavigator = () => {
  const { nextAction } = useProfileContext()
  const navigation = useNavigation<ProfileNavigationProp>()
  React.useEffect(() => {
    if (nextAction === ProfileCreateSteps.FIND_FRIENDS) {
      navigation.navigate(routes.FIND_FRIEND)
    }
    if (nextAction === ProfileCreateSteps.PROFILE_PICTURE) {
      navigation.navigate(routes.PROFILE_PICTURE)
    }
    if (nextAction === ProfileCreateSteps.START) {
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
