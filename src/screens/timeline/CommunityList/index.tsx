import Text from 'components/Text'
import React from 'react'
import { View } from 'react-native'

import tw from 'lib/tailwind'
import Link from 'components/Link'
import routes from 'navigation/routes'
import { useFetchCommunityQuery } from 'store/community'

const CommunityList = () => {
  const {
    data: communities = [],
    isFetching,
    refetch,
  } = useFetchCommunityQuery()

  return (
    <>
      <View
        style={tw`flex flex-row justify-between items-center 
      mt-2 mb-1`}
      >
        <Text category="h5" style={tw`text-gray-500 font-thin`}>
          Community
        </Text>
        <Link text="see All" to={routes.HOME} />
      </View>
      {/* <View style={tw`mb-3`}>
       <FlatList
            data={communities}
            renderItem={({ item }) => <Community {...item} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
    </>
  )
}

export default CommunityList
