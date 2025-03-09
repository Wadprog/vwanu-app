import { View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text'
import Post from '../../components/Post'
import PostInput from '../../components/PostInput'
import Community from '../../components/community'

import Banner from '../../components/Appbanner'
import tw from '../../lib/tailwind'
import Link from '../../components/Link'
import routes from '../../navigation/routes'
import Screen from '../../components/screen'
import { useFetchPostsQuery } from '../../store/post'
import { useFetchCommunityQuery } from '../../store/community'
import TimelineSkeletone from './TimelineSkeletone'
import NoPost from '../../components/NoPost'

const Separator = () => <View style={tw`m-1`} />

const Timeline: React.FC = () => {
  const [page, setPage] = useState({ skip: 0, limit: 10 })
  const posts = useFetchPostsQuery()
  const loadMore = () => {
    console.log('loadMore', posts.isFetching)
    if (!posts.isFetching) {
      setPage((prev) => ({ ...prev, skip: prev.skip + 10 }))
    }
  }
  console.log({ posts: posts.data, p: posts })

  const {
    data: communities = [],
    isFetching,
    refetch,
  } = useFetchCommunityQuery()

  return (
    <Screen
      loading={posts.isLoading || posts.isFetching}
      loadingScreen={<TimelineSkeletone />}
      error={
        null
        // posts.error
        //   ? {
        //       message: posts.error as string,
        //       onRetry: () => {
        //         posts.refetch()
        //       },
        //     }
        //   : null
      }
    >
      <View style={tw`bg-white p-3 relative`}>
        {/* <Banner /> */}
        <View style={tw`mt-3`}>
          <PostInput />
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-2 mb-1`}>
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
        <View>
          <FlatList
            ListEmptyComponent={() => (
              <View style={tw`mt-20`}>
                <NoPost
                  title="No posts Yet"
                  subtitle="Hurry be the first to create a post"
                />
              </View>
            )}
            refreshing={posts.isFetching}
            onRefresh={() => posts.refetch()}
            data={posts.data?.data}
            renderItem={(post) => <Post {...post.item} />}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() =>
              posts.isFetching ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : null
            }
          />
        </View>
      </View>
    </Screen>
  )
}

export default Timeline
