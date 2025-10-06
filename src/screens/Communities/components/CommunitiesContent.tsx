import React from 'react'
import { View, ScrollView } from 'react-native'
import tw from 'lib/tailwind'
import FeaturedCommunity from './FeaturedCommunity'
import RecentCommunities from './RecentCommunities'
import { CommunityInterface } from '../../../../types'

interface CommunitiesContentProps {
  communities: CommunityInterface[]
}

const CommunitiesContent: React.FC<CommunitiesContentProps> = ({
  communities,
}) => {
  if (!communities || communities.length === 0) {
    return null
  }

  const featuredCommunity = communities[0]
  const recentCommunities = communities

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <FeaturedCommunity community={featuredCommunity} />
        <RecentCommunities communities={recentCommunities} />
      </ScrollView>
    </View>
  )
}

export default CommunitiesContent
