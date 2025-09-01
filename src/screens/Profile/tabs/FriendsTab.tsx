/**
 * Friends Tab Component
 * Placeholder for future friends feature
 */
import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Components
import Text from '../../../components/Text'

// Hooks and utilities
import tw from '../../../lib/tailwind'

// Types
import { TabContentProps } from '../types'

const FriendsTab: React.FC<TabContentProps> = () => {
  return (
    <View style={tw`flex-1 justify-center items-center p-8`}>
      <Ionicons name="people-outline" size={64} color="#9CA3AF" />
      <Text style={tw`text-gray-500 mt-4 text-center`}>
        Friends feature coming soon
      </Text>
      <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
        Connect with people you know
      </Text>
    </View>
  )
}

export default FriendsTab
