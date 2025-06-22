import Text from '../../components/Text'
import PostInput from '../../components/PostInput'
import Community from '../../components/community'
import { useScroll } from '../../contexts/ScrollContext'
import React, { useState } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import {
  PaginationProvider,
  usePagination,
} from '../../contexts/PaginationContext'
import Post from '../../components/Post'

import Banner from '../../components/Appbanner'
import tw from '../../lib/tailwind'
import Link from '../../components/Link'
import routes from '../../navigation/routes'
import Screen from '../../components/screen'
import { useFetchPostsQuery } from '../../store/post'
import { useFetchCommunityQuery } from '../../store/community'
import TimelineSkeletone from './TimelineSkeletone'
import NoPost from '../../components/NoPost'

const Separator = () => <View style={tw`m-1 h-1 bg-gray-100`} />
const TimelineContent = () => {
  const { loadMore } = usePagination()
  const { handleScroll: handleScroll2 } = useScroll()
  const { handleScroll, pagination } = useInfiniteScroll({
    onLoadMore: () => {
      if (!posts.isFetching && posts.data?.data.length === pagination.limit) {
        setHasMore(posts.data?.data.length === pagination.limit)
      }
    },
  })
  const [hasMore, setHasMore] = useState(true)

  const posts = useFetchPostsQuery({
    $limit: pagination.limit,
    $skip: pagination.skip,
    $sort: { createdAt: -1 },
  })

  const {
    data: communities = [],
    isFetching,
    refetch,
  } = useFetchCommunityQuery()

  if (posts.isLoading) {
    return <TimelineSkeletone />
  }

  return (
    <Screen
      loading={posts.isLoading}
      loadingScreen={<TimelineSkeletone />}
      error={null}
    >
      <View style={tw`bg-white p-3 relative`}>
        {/* <Banner /> */}
        <View style={tw`mt-3`}>
          <PostInput />
        </View>
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
            renderItem={(post) => (
              <Post {...post.item} toggleCommenting={() => {}} />
            )}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            onScroll={(e) => {
              handleScroll2(e)
              handleScroll(e)
            }}
            scrollEventThrottle={16}
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

const Timeline = () => {
  return (
    <PaginationProvider initialLimit={10}>
      <TimelineContent />
    </PaginationProvider>
  )
}

export default Timeline
