import Text from 'components/Text'
import React from 'react'
import { View, FlatList } from 'react-native'

import tw from 'lib/tailwind'
import Link from 'components/Link'
import routes from 'navigation/routes'
import Community from 'components/community'
import {
  mockCommunities,
  MockCommunityInterface,
} from '../../../data/mockCommunities'

const CommunityList = () => {
  // For now, use mock data. In the future, uncomment the API call below:
  // const {
  //   data: communities = [],
  //   isFetching,
  //   refetch,
  // } = useFetchCommunityQuery()

  const communities = mockCommunities

  const renderCommunityItem = ({ item }: { item: MockCommunityInterface }) => (
    <Community
      id={item.id}
      name={item.name}
      backgroundImage={item.backgroundImage}
      interests={item.interests}
      createdAt={item.createdAt}
      memberCount={item.memberCount}
      isCreateCard={item.isCreateCard}
      isMember={item.isMember}
    />
  )

  const renderSeparator = () => <View style={tw`w-3`} />

  return (
    <>
      <View
        style={tw`flex flex-row justify-between items-center
      mt-2 mb-3`}
      >
        <Text category="h5" style={tw`text-gray-500 font-thin`}>
          Communities
        </Text>
        <Link text="see All" to={routes.COMMUNITY} />
      </View>
      <View style={tw`mb-4`}>
        <FlatList
          data={communities}
          renderItem={renderCommunityItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-1`}
        />
      </View>
    </>
  )
}

export default CommunityList
