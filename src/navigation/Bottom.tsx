/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Platform, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'

import routes from './routes'
import Feed from './Feed'
import Chat from './Chat'
import tw from '../lib/tailwind'
import ChatNavigator from './Chat'
import FeedNavigator from './Feed'
import AccountNavigator from './Account'
import { BottomTabParms } from '../../types'
import CommunityIcon from 'assets/svg/Community'
import { selectTabBarVisibility } from '../store/ui-slice'

const Tab = createBottomTabNavigator<BottomTabParms>()

const defaultTabBarStyle: ViewStyle = {
  backgroundColor: '#fff',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 60,
  paddingBottom: 5,
  borderTopWidth: 1,
  borderTopColor: '#E5E7EB',
  ...Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 0,
    },
  }),
}

const BottomTabNavigator: React.FC = () => {
  const isTabBarVisible = useSelector(selectTabBarVisibility)

  return (
    <Tab.Navigator
      screenOptions={(route) => ({
        headerShown: false,
        headerTransparent: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: tw.color('primary'),
        tabBarInactiveTintColor: tw.color('gray-300'),
        tabBarStyle: getTabBarVisibility(route)
          ? { display: 'none' }
          : isTabBarVisible
          ? defaultTabBarStyle
          : { display: 'none' },
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
}

export default BottomTabNavigator
const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Timeline'
  return routeName === 'Gallery'
}
