/**
 * Appearance Settings Screen
 * Theme and display preferences
 */
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'

const AppearanceSettings: React.FC = () => {
  const navigation = useNavigation()
  const { isDarkMode, systemColorScheme } = useTheme()

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
          <Text style={tw`text-xl font-bold`}>Appearance</Text>
        </View>

        <View style={tw`p-4`}>
          {/* Current Theme Status */}
          <View
            style={tw`p-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons
                name={
                  isDarkMode ? 'moon-waning-crescent' : 'white-balance-sunny'
                }
                size={24}
                color={isDarkMode ? '#60A5FA' : '#F59E0B'}
                style={tw`mr-3`}
              />
              <Text style={tw`font-semibold text-lg`}>
                {isDarkMode ? 'Dark' : 'Light'} Theme
              </Text>
            </View>
            <Text
              style={tw`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}
            >
              Theme automatically follows your system settings
            </Text>
            <Text
              style={tw`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              System preference: {systemColorScheme || 'Unknown'}
            </Text>
          </View>

          {/* Info */}
          <View
            style={tw`mt-6 p-4 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
            } rounded-lg`}
          >
            <View style={tw`flex-row items-start`}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={isDarkMode ? '#60A5FA' : '#2563EB'}
                style={tw`mr-2 mt-0.5`}
              />
              <View style={tw`flex-1`}>
                <Text
                  style={tw`font-semibold text-sm ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}
                >
                  Automatic Theme
                </Text>
                <Text
                  style={tw`text-sm mt-1 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}
                >
                  The app theme changes automatically based on your device's
                  system settings. You can change this in your device's display
                  settings.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
}

export default AppearanceSettings
