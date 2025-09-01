/**
 * Privacy Settings Screen
 * Placeholder for privacy and security settings
 */
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'

const PrivacySettings: React.FC = () => {
  const navigation = useNavigation()
  const { isDarkMode } = useTheme()

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
          <Text style={tw`text-xl font-bold`}>Privacy & Security</Text>
        </View>

        <View style={tw`flex-1 items-center justify-center p-8`}>
          <Ionicons name="shield-outline" size={64} color="#9CA3AF" />
          <Text style={tw`text-gray-500 mt-4 text-center`}>
            Privacy settings coming soon
          </Text>
          <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
            Manage your privacy preferences and security settings
          </Text>
        </View>
      </View>
    </Screen>
  )
}

export default PrivacySettings
