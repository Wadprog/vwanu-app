/**
 * Settings Screen
 * Main settings page with navigation to various setting categories
 */
import React from 'react'
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'
import { ProfileStackParams } from '../../../types'
import { signOutUser } from '../../store/auth-slice'
import { AppDispatch, RootState } from '../../store'

type SettingsNavigationProp = StackNavigationProp<ProfileStackParams>

interface SettingsOption {
  id: string
  title: string
  subtitle?: string
  icon: string
  onPress: () => void
  showChevron?: boolean
  textColor?: string
  dangerous?: boolean
}

const Settings: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>()
  const dispatch = useDispatch<AppDispatch>()
  const { isDarkMode } = useTheme()

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          dispatch(signOutUser())
        },
      },
    ])
  }

  const settingsOptions: SettingsOption[] = [
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Push notifications, email alerts',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('NotificationSettings' as any),
      showChevron: true,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Account privacy, blocked users',
      icon: 'shield-outline',
      onPress: () => navigation.navigate('PrivacySettings' as any),
      showChevron: true,
    },
    {
      id: 'account',
      title: 'Account',
      subtitle: 'Profile info, password',
      icon: 'person-outline',
      onPress: () => navigation.navigate('AccountSettings' as any),
      showChevron: true,
    },
    {
      id: 'appearance',
      title: 'Appearance',
      subtitle: 'Theme follows system settings',
      icon: 'color-palette-outline',
      onPress: () => navigation.navigate('AppearanceSettings' as any),
      showChevron: true,
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'FAQ, contact us',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('HelpSettings' as any),
      showChevron: true,
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'Version, terms, privacy policy',
      icon: 'information-circle-outline',
      onPress: () => navigation.navigate('AboutSettings' as any),
      showChevron: true,
    },
    {
      id: 'signout',
      title: 'Sign Out',
      subtitle: 'Sign out of your account',
      icon: 'log-out-outline',
      onPress: handleSignOut,
      showChevron: false,
      dangerous: true,
    },
  ]

  const renderSettingsOption = (option: SettingsOption) => (
    <TouchableOpacity
      key={option.id}
      onPress={option.onPress}
      style={tw`flex-row items-center p-4 border-b border-gray-200`}
    >
      {/* Icon */}
      <View
        style={tw`w-10 h-10 rounded-full ${
          option.dangerous
            ? isDarkMode
              ? 'bg-red-900'
              : 'bg-red-100'
            : isDarkMode
            ? 'bg-blue-900'
            : 'bg-blue-100'
        } items-center justify-center mr-3`}
      >
        <Ionicons
          name={option.icon as any}
          size={20}
          color={
            option.dangerous
              ? isDarkMode
                ? '#F87171'
                : '#DC2626'
              : isDarkMode
              ? '#60A5FA'
              : '#2563EB'
          }
        />
      </View>

      {/* Content */}
      <View style={tw`flex-1`}>
        <Text
          style={tw`font-semibold ${
            option.dangerous
              ? isDarkMode
                ? 'text-red-400'
                : 'text-red-600'
              : ''
          }`}
        >
          {option.title}
        </Text>
        {option.subtitle && (
          <Text
            style={tw`text-sm mt-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {option.subtitle}
          </Text>
        )}
      </View>

      {/* Chevron */}
      {option.showChevron && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDarkMode ? '#9CA3AF' : '#6B7280'}
        />
      )}
    </TouchableOpacity>
  )

  return (
    <Screen>
      <View style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center p-4 border-b `}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`mr-3`}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold`}>Settings</Text>
        </View>

        {/* Settings Options */}
        <ScrollView style={tw`flex-1`}>
          {settingsOptions.map(renderSettingsOption)}
        </ScrollView>
      </View>
    </Screen>
  )
}

export default Settings
