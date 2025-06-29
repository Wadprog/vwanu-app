import React from 'react'
import { View } from 'react-native'
import Post from 'components/Post'

import tw from 'lib/tailwind'
import NoPost from 'components/NoPost'
import Separator from 'components/Separator'
import { useFetchPostsQuery } from 'store/post'
import TimelineSkeletone from './TimelineSkeletone'
import PaginatedList, { PaginationParams } from 'components/PaginatedList'

interface Props {
  setIsFetching: (isFetching: boolean) => void
  setHasPost: (hasPost: boolean) => void
}

const PostList = ({ setIsFetching, setHasPost }: Props) => {
  const [queryParams, setQueryParams] = React.useState({
    $limit: 10,
    $skip: 0,
    $sort: { createdAt: -1 } as const,
  })
  const posts = useFetchPostsQuery(queryParams)

  const fetchPosts = async ({ limit, skip }: PaginationParams) => {
    setQueryParams((prev) => ({
      ...prev,
      $limit: limit,
      $skip: skip,
    }))

    const result = await posts.refetch()

    if (!result.data) {
      return { data: [], total: 0 }
    }

    return {
      data: result.data.data,
      total: result.data.limit,
    }
  }

  if (posts.isLoading && !posts.data) {
    return <TimelineSkeletone />
  }

  return (
    <PaginatedList
      initialLimit={10}
      fetchData={fetchPosts}
      isLoading={posts.isLoading}
      isFetching={posts.isFetching}
      contentContainerStyle={tw`pb-34`}
      ItemSeparatorComponent={() => <Separator style="h-1" />}
      showsVerticalScrollIndicator={false}
      keyExtractor={({ id }) => id.toString()}
      LoadingComponent={<TimelineSkeletone />}
      ListEmptyComponent={() => (
        <View style={tw`mt-20`}>
          <NoPost
            title="No posts Yet"
            subtitle="Hurry be the first to create a post"
          />
        </View>
      )}
      renderItem={(post) => <Post {...post.item} toggleCommenting={() => {}} />}
      onBottomNavVisibilityChange={(isVisible) => {
        // Handle bottom nav visibility if needed
      }}
    />
  )
}

export default PostList
