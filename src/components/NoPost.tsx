import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import tw from 'lib/tailwind'
import Text from 'components/Text'
import NoPost from 'assets/svg/NoPost'

interface NoPostProps {
  title?: string
  subtitle?: string
  actionBtn?: {
    label: string
    onPress: () => void
  }
}

const EmptyPost: React.FC<NoPostProps> = ({
  title = 'No posts found',
  subtitle,
  actionBtn,
}) => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <NoPost width={300} height={300} />
      <Text style={tw`text-center text-gray-500 text-lg font-medium mb-1`}>
        {title}
      </Text>
      {subtitle && (
        <Text style={tw`text-center text-gray-400 mb-4`}>{subtitle}</Text>
      )}
      {actionBtn && (
        <TouchableOpacity
          onPress={actionBtn.onPress}
          style={tw`px-4 py-2 bg-primary rounded-full`}
        >
          <Text style={tw`text-white font-medium`}>{actionBtn.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default EmptyPost
