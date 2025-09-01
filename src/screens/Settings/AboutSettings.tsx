/**
 * About Settings Screen
 * App information, version, terms, and privacy policy
 */
import React from 'react'
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'

interface AboutOption {
  id: string
  title: string
  subtitle?: string
  icon: string
  onPress: () => void
  showChevron?: boolean
}

const AboutSettings: React.FC = () => {
  const navigation = useNavigation()
  const { isDarkMode } = useTheme()

  const handleTermsOfService = () => {
    // TODO: Navigate to terms of service screen or open web link
    Linking.openURL('https://vwanu.com/terms')
  }

  const handlePrivacyPolicy = () => {
    // TODO: Navigate to privacy policy screen or open web link
    Linking.openURL('https://vwanu.com/privacy')
  }

  const handleLicenses = () => {
    // TODO: Show open source licenses
    console.log('Show open source licenses')
  }

  const aboutOptions: AboutOption[] = [
    {
      id: 'terms',
      title: 'Terms of Service',
      subtitle: 'Read our terms and conditions',
      icon: 'document-text-outline',
      onPress: handleTermsOfService,
      showChevron: true,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      subtitle: 'How we handle your data',
      icon: 'shield-checkmark-outline',
      onPress: handlePrivacyPolicy,
      showChevron: true,
    },
    {
      id: 'licenses',
      title: 'Open Source Licenses',
      subtitle: 'Third-party software licenses',
      icon: 'code-outline',
      onPress: handleLicenses,
      showChevron: true,
    },
  ]

  const renderAboutOption = (option: AboutOption) => (
    <TouchableOpacity
      key={option.id}
      onPress={option.onPress}
      style={tw`flex-row items-center p-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
    >
      {/* Icon */}
      <View
        style={tw`w-10 h-10 rounded-full ${
          isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
        } items-center justify-center mr-3`}
      >
        <Ionicons
          name={option.icon as any}
          size={20}
          color={isDarkMode ? '#60A5FA' : '#2563EB'}
        />
      </View>

      {/* Content */}
      <View style={tw`flex-1`}>
        <Text style={tw`font-semibold`}>{option.title}</Text>
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
        <View
          style={tw`flex-row items-center p-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
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
          <Text style={tw`text-xl font-bold`}>About</Text>
        </View>

        <ScrollView style={tw`flex-1`}>
          {/* App Info */}
          <View
            style={tw`items-center p-8 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <View
              style={tw`w-20 h-20 rounded-xl ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              } items-center justify-center mb-4`}
            >
              <Text
                style={tw`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-800'
                }`}
              >
                V
              </Text>
            </View>
            <Text style={tw`text-2xl font-bold mb-2`}>Vwanu</Text>
            <Text
              style={tw`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
            >
              Version 1.0.0
            </Text>
            <Text
              style={tw`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Connect with friends and share your moments
            </Text>
          </View>

          {/* Legal Links */}
          <View style={tw`mt-4`}>
            <Text
              style={tw`px-4 pb-2 font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              LEGAL
            </Text>
            {aboutOptions.map(renderAboutOption)}
          </View>

          {/* Additional Info */}
          <View style={tw`p-4 mt-6`}>
            <Text
              style={tw`text-center text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              © 2024 Vwanu. All rights reserved.
            </Text>
            <Text
              style={tw`text-center text-sm mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Made with ❤️ for connecting people
            </Text>
          </View>

          <View style={tw`h-20`} />
        </ScrollView>
      </View>
    </Screen>
  )
}

export default AboutSettings
