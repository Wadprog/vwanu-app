import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import tw from 'lib/tailwind'
import Text from 'components/Text'

const ProfileNotFound: React.FC = () => {
  return (
    <View style={tw`flex-1 justify-center items-center p-8`}>
      <Ionicons name="person-outline" size={64} color="#9CA3AF" />
      <Text style={tw`text-gray-500 mt-4 text-center`}>Profile not found</Text>
    </View>
  )
}

export default ProfileNotFound
