import React from 'react'
import { View } from 'react-native'
import tw from 'lib/tailwind'
import PostList from '../../timeline/PostList'
import PostInput from '../../../components/CreatePost/PostInput'

interface PostsTabProps {
  communityId: string
}

const PostsTab: React.FC<PostsTabProps> = ({ communityId }) => {
  return (
    <View style={tw`flex-1 px-4`}>
      <View style={tw`bg-white border-b border-gray-100`}>
        <PostInput communityId={communityId} />
      </View>
      <PostList communityId={communityId} />
    </View>
  )
}

export default PostsTab
