import React from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import tw from 'lib/tailwind'
import Post from 'components/Post'
import Text from 'components/Text'
import Screen from 'components/screen'
import Comment from 'components/Comment'
import CommentForm from 'components/CommentForm'
import { FeedStackParams } from '../../../types'
import { useFetchPostQuery, useFetchPostsQuery } from 'store/post'
import useToggle from 'hooks/useToggle'
import { useScroll } from 'contexts/ScrollContext'
import { useTheme } from 'hooks/useTheme'

type Props = StackScreenProps<FeedStackParams, 'SinglePost'>

const SinglePostScreen: React.FC<Props> = ({ route }) => {
  const { postId, isCommenting: initialCommenting = false } = route.params
  const [commenting, toggleCommenting] = useToggle(initialCommenting)
  const {
    data: post,
    isLoading: loadingPost,
    error,
  } = useFetchPostQuery(postId)
  const { isDarkMode } = useTheme()

  const { data: commentsData = { data: [] }, isLoading: loadingComments } =
    useFetchPostsQuery({ postId })

  const comments = commentsData.data

  const { handleScroll, scrollRef } = useScroll()

  if (loadingPost) {
    return (
      <Screen>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Screen>
    )
  }

  if (error || !post) {
    return (
      <Screen>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-red-500`}>Failed to load post</Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen>
      <View style={tw` pb-3 pt-10 px-3 relative flex-1`}>
        <FlatList
          ref={scrollRef}
          onScroll={handleScroll}
          data={comments}
          style={tw`flex-1`}
          ListHeaderComponent={() => (
            <>
              <Post
                {...post}
                showViewComment={false}
                disableNavigation={true}
                toggleCommenting={toggleCommenting}
              />
              <View
                style={tw`px-4 py-2 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <Text
                  style={tw`font-bold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Comments
                </Text>
              </View>
            </>
          )}
          renderItem={({ item }) => <Comment comment={item} />}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={() => (
            <View style={tw`p-4 items-center`}>
              {loadingComments ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text style={tw`text-gray-500`}>No comments yet</Text>
              )}
            </View>
          )}
        />
        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-4`}
        >
          <CommentForm postId={String(postId)} onSubmit={toggleCommenting} />
        </View>
      </View>
    </Screen>
  )
}

export default SinglePostScreen
