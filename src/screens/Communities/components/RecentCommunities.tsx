import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Text from 'components/Text'
import tw from 'lib/tailwind'
import CommunityGridCard from './CommunityGridCard'
import { CommunityInterface } from '../../../../types'

interface RecentCommunitiesProps {
  communities: CommunityInterface[]
}

const RecentCommunities: React.FC<RecentCommunitiesProps> = ({
  communities,
}) => (
  <View style={tw`px-4 py-2`}>
    <View style={tw`flex-row items-center justify-between mb-3`}>
      <Text category="h6" style={tw`font-semibold text-lg`}>
        Recent
      </Text>
      <TouchableOpacity style={tw`flex-row items-center`}>
        <Text style={tw`text-blue-500 font-medium mr-1`}>Filter</Text>
        <Ionicons name="filter" size={16} color="#3B82F6" />
      </TouchableOpacity>
    </View>

    <View style={tw`flex-row flex-wrap justify-between`}>
      {communities.map((community) => (
        <View key={community.id} style={tw`w-[48%] mb-4`}>
          <CommunityGridCard community={community} size="small" />
        </View>
      ))}
    </View>
  </View>
)

export default RecentCommunities
