/**
 * Pictures Tab Component
 * Placeholder for future pictures feature
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

const PicturesTab: React.FC<TabContentProps> = () => {
  return (
    <View style={tw`flex-1 justify-center items-center p-8`}>
      <Ionicons name="images-outline" size={64} color="#9CA3AF" />
      <Text style={tw`text-gray-500 mt-4 text-center`}>
        Pictures feature coming soon
      </Text>
      <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
        Share your favorite moments
      </Text>
    </View>
  )
}

export default PicturesTab
