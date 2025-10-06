import React from 'react'
import { View } from 'react-native'
import tw from 'lib/tailwind'
import Text from 'components/Text'

interface CommunityStatsProps {
  numMembers: number
  numAdmins: number
  numPosts: number
}

const CommunityStats: React.FC<CommunityStatsProps> = ({
  numMembers,
  numAdmins,
  numPosts,
}) => {
  const totalMembers = numMembers + numAdmins

  return (
    <View style={tw`bg-white border-b border-gray-100`}>
      <View style={tw`flex-row justify-center py-4`}>
        <View style={tw`items-center flex-1`}>
          <Text style={tw`text-2xl font-bold text-gray-800`}>
            {totalMembers.toLocaleString()}
          </Text>
          <Text style={tw`text-gray-600 text-sm`}>Members</Text>
        </View>

        <View style={tw`w-px bg-gray-200 mx-4`} />

        <View style={tw`items-center flex-1`}>
          <Text style={tw`text-2xl font-bold text-gray-800`}>
            {numPosts.toLocaleString()}K
          </Text>
          <Text style={tw`text-gray-600 text-sm`}>Posts</Text>
        </View>
      </View>
    </View>
  )
}

export default CommunityStats
