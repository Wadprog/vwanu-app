/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from '@ui-kitten/components'

import routes from './routes'
// import Feed from './Feed'
// import Chat from './Chat'
import tw from '../lib/tailwind'
import ChatNavigator from './Chat'
import FeedNavigator from './Feed'
import AccountNavigator from './Account'
import { BottomTabParms } from '../../types'
// import CommunityIcon from 'assets/svg/Community'
import { useTailwindTheme } from '../hooks/useTailwindTheme'
import { useTheme } from '../hooks/useTheme'

const Tab = createBottomTabNavigator<BottomTabParms>()

const BottomTabBar = ({
  navigation,
  state,
}: {
  navigation: any
  state: any
}) => {
  const { isDarkMode } = useTheme()
  const iconColor = isDarkMode ? 'white' : tw.color('text-primary')
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title={routes.TIMELINE}
        icon={
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={20}
            color={iconColor}
          />
        }
      />
      <BottomNavigationTab
        title={routes.ACCOUNT}
        icon={
          <MaterialCommunityIcons name="account" size={20} color={iconColor} />
        }
      />
      {/* <BottomNavigationTab title={routes.INBOX} icon={<MaterialCommunityIcons name="chat" size={20} color={iconColor} />} />
    <BottomNavigationTab title={routes.COMMUNITY} icon={<CommunityIcon size={20} color={iconColor} />} /> */}
    </BottomNavigation>
  )
}

const TabNavigator = () => {
  const { colors } = useTailwindTheme()
  return (
    <Tab.Navigator
      screenOptions={(route) => ({
        headerShown: false,
        headerTransparent: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: getTabBarVisibility(route)
          ? { display: 'none' }
          : { display: 'flex' },
      })}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name={routes.TIMELINE} component={FeedNavigator} />
      <Tab.Screen name={routes.ACCOUNT} component={AccountNavigator} />
      <Tab.Screen name={routes.INBOX} component={ChatNavigator} />
      <Tab.Screen name={routes.COMMUNITY} component={ChatNavigator} />
    </Tab.Navigator>
  )
}
const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Timeline'
  return routeName === 'Gallery'
}
export default TabNavigator
