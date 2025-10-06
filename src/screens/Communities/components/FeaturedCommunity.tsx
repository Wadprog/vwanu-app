import React from 'react'
import { View } from 'react-native'
import tw from 'lib/tailwind'
import CommunityGridCard from './CommunityGridCard'
import { CommunityInterface } from '../../../../types'

interface FeaturedCommunityProps {
  community: CommunityInterface
}

const FeaturedCommunity: React.FC<FeaturedCommunityProps> = ({ community }) => (
  <View style={tw`px-4 py-2`}>
    <CommunityGridCard community={community} size="large" />
  </View>
)

export default FeaturedCommunity
