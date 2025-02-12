/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import routes from './routes'
import tw from '../lib/tailwind'
import ChatNavigator from './Chat'
import FeedNavigator from './Feed'
import AccountNavigator from './Account'
import { BottomTabParms } from '../../types'
import CommunityIcon from 'assets/svg/Community'

const Tab = createBottomTabNavigator<BottomTabParms>()

const BottomTabNavigator: React.FC<{}> = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      headerTransparent: true,
      tabBarShowLabel: true,
      tabBarActiveTintColor: tw.color('primary'),
      tabBarInactiveTintColor: tw.color('gray-300'),
      tabBarStyle: {
        display: getTabBarVisibility(route) ? 'none' : 'flex',
      },
    })}
  >
    <Tab.Screen
      name={routes.TIMELINE}
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.ACCOUNT}
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name={routes.INBOX}
      component={ChatNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="chat" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name={routes.COMMUNITY}
      component={ChatNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <CommunityIcon size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default BottomTabNavigator

const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Timeline'
  return routeName === 'Gallery'
}
