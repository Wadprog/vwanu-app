import React, { useCallback, useMemo } from 'react'
import Post from 'components/Post'
import { View } from 'react-native'
import tw from 'lib/tailwind'
import NoPost from 'components/NoPost'
import Separator from 'components/Separator'
import { useFetchPostsQuery } from 'store/post'
import TimelineSkeletone from './TimelineSkeletone'
import PaginatedList, { PaginationParams } from 'components/PaginatedList'

interface Props {}

const PostList: React.FC<Props> = () => {
  const initialQueryParams = useMemo(
    () => ({
      $limit: 10,
      $skip: 0,
      $sort: { createdAt: -1 } as const,
    }),
    []
  )

  const posts = useFetchPostsQuery(initialQueryParams)

  const fetchPosts = useCallback(
    async ({ limit, skip }: PaginationParams) => {
      try {
        const result = await posts.refetch()

        if (!result.data) {
          return { data: [], total: 0 }
        }

        return {
          data: result.data.data,
          total: result.data.data.length,
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        return { data: [], total: 0 }
      }
    },
    [posts.refetch]
  )

  const shouldShowLoading = posts.isLoading && !posts.data

  if (shouldShowLoading) {
    return <TimelineSkeletone />
  }

  return (
    <PaginatedList
      initialData={{ data: posts.data?.data || [], total: 5 }}
      initialLimit={10}
      fetchData={fetchPosts}
      isFetching={posts.isFetching || posts.isLoading}
      contentContainerStyle={tw`pb-34`}
      ItemSeparatorComponent={() => <Separator style="h-1" />}
      showsVerticalScrollIndicator={false}
      keyExtractor={({ id }) => id.toString()}
      renderItem={(post) => <Post {...post.item} toggleCommenting={() => {}} />}
      ListEmptyComponent={
        <View style={tw`mt-20`}>
          <NoPost
            title="No posts Yet"
            subtitle="Hurry be the first to create a post"
          />
        </View>
      }
    />
  )
}

export default PostList
