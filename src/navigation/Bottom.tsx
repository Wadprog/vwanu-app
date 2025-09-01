/**
 * Bottom Tab Navigator
 * Main navigation between primary app sections
 */
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'

// Configuration and utilities
import { tabConfig } from './config/navigationConfig'
import { getTabBarStyle, SCREEN_NAMES } from './utils/navigationUtils'
import routes from './routes'

// Hooks and styles
import tw from '../lib/tailwind'
import { useTailwindTheme } from '../hooks/useTailwindTheme'
import { useTheme } from '../hooks/useTheme'

// Navigators
import ChatNavigator from './Chat'
import FeedNavigator from './Feed'
import AccountNavigator from './Account'

// Types
import { BottomTabParms } from '../../types'

const Tab = createBottomTabNavigator<BottomTabParms>()

/**
 * Custom Bottom Tab Bar Component
 * Uses UI Kitten's BottomNavigation with theme support
 */
interface TabBarProps {
  navigation: any
  state: any
}

const BottomTabBar: React.FC<TabBarProps> = ({ navigation, state }) => {
  const { isDarkMode } = useTheme()
  const iconColor = isDarkMode ? 'white' : tw.color('text-primary')

  const handleTabPress = (index: number) => {
    const routeName = state.routeNames[index]

    // If navigating to Account tab, reset profile parameters to show own profile
    if (routeName === routes.ACCOUNT) {
      navigation.navigate(routeName, {
        screen: routes.PROFILE,
        params: { profileId: undefined },
      })
    } else {
      navigation.navigate(routeName)
    }
  }

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={handleTabPress}>
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
      {/* Disabled tabs - can be enabled when features are ready
      <BottomNavigationTab 
        title={routes.INBOX} 
        icon={
          <MaterialCommunityIcons 
            name="chat" 
            size={20} 
            color={iconColor} 
          />
        } 
      />
      <BottomNavigationTab 
        title={routes.COMMUNITY} 
        icon={
          <CommunityIcon 
            size={20} 
            color={iconColor} 
          />
        } 
      />
      */}
    </BottomNavigation>
  )
}

/**
 * Main Bottom Tab Navigator
 * Provides primary navigation between app sections
 */
const BottomTabNavigator: React.FC = () => {
  const { colors } = useTailwindTheme()

  return (
    <Tab.Navigator
      screenOptions={(route) => ({
        ...tabConfig,
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: getTabBarStyle(route),
      })}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName={SCREEN_NAMES.FEED_TAB}
    >
      <Tab.Screen
        name={routes.TIMELINE}
        component={FeedNavigator}
        options={{ title: 'Timeline' }}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{ title: 'Profile' }}
      />
      {/* Disabled for now - can be enabled when features are ready */}
      <Tab.Screen
        name={routes.INBOX}
        component={ChatNavigator}
        options={{ title: 'Messages' }}
      />
      <Tab.Screen
        name={routes.COMMUNITY}
        component={ChatNavigator}
        options={{ title: 'Community' }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
