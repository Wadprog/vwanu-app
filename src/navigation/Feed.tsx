import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

// Custom core imports
import TimelineScreen from '../screens/timeline/Timeline.screen'
import ImageGallery from '../screens/timeline/ImageGallery.screen'
import CommentScreen from '../screens/timeline/Comment.screen'
import { FeedStackParams } from '../../types'

const options = {
  headerTitle: '',
  headerShown: true,
  headerTransparent: false,
  headerStyle: { height: 100 },
}
const Stack = createStackNavigator<FeedStackParams>()

const TimelineNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTransparent: false,
    }}
  >
    <Stack.Screen
      name="Timeline"
      component={TimelineScreen}
      options={options}
    />
    <Stack.Screen name="Gallery" component={ImageGallery} />
    <Stack.Screen name="Comment" options={options} component={CommentScreen} />
  </Stack.Navigator>
)

export default TimelineNavigator

// Helper function to get tab bar visibility
const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Timeline'
  return routeName === 'Gallery'
}
