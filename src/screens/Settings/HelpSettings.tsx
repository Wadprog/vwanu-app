/**
 * Help Settings Screen
 * Help, support, and contact information
 */
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'

const HelpSettings: React.FC = () => {
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
          <Text style={tw`text-xl font-bold`}>Help & Support</Text>
        </View>

        <View style={tw`flex-1 items-center justify-center p-8`}>
          <Ionicons name="help-circle-outline" size={64} color="#9CA3AF" />
          <Text style={tw`text-gray-500 mt-4 text-center`}>
            Help & support coming soon
          </Text>
          <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
            FAQ, contact support, and helpful resources
          </Text>
        </View>
      </View>
    </Screen>
  )
}

export default HelpSettings
