import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Dimensions } from 'react-native'

import Text from './Text'
import tw from '../lib/tailwind'
import ImageGrid from './ImageGrid'
import CommentForm from './CommentFrom'
import AvatarGroup from './AvatarGroups'
import useToggle from '../hooks/useToggle'
import { useFetchLikesQuery, useUpdatePostMutation } from '../store/post'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { PostProps } from '../../types'

const { height, width } = Dimensions.get('screen')
interface Props extends PostProps {
  showViewComment?: boolean
}
const Post: React.FC<Props> = ({ showViewComment = true, ...props }) => {
  const navigation = useNavigation()
  const [commenting, toggleCommenting] = useToggle(false)
  const [modifying, toggleModifying] = useToggle(false)
  const [seeLikers, toggleLikerPopover] = useToggle(false)
  const likers = useFetchLikesQuery(props.id, { skip: seeLikers })
  const [updatePost, updatePostMeta] = useUpdatePostMutation()

  return (
    <View style={tw`static`}>
      <PostHeader
        {...props}
        updatePostMeta={updatePostMeta}
        onDeletePress={toggleModifying}
        toggleDeleting={toggleModifying}
        deletingVisible={modifying}
        updatePost={updatePost}
      />

      <Text category="p2" style={tw`text-gray-500 mb-2`}>
        {props.postText}
      </Text>

      {props?.Media && props.Media.length > 0 && (
        <ImageGrid
          medias={props.Media || []}
          style={tw`mb-2`}
          onImageTouch={(id) => {
            const index = props.Media?.findIndex(
              (media) => media?.id === id.toString()
            )
            //@ts-ignore
            navigation.navigate('Gallery', { ...props, initialSlide: index })
          }}
        />
      )}

      <AvatarGroup avatars={props.reactors || []} style={tw`mt-2`} />

      <PostFooter
        {...props}
        toggleCommenting={toggleCommenting}
        toggleLikerPopover={toggleLikerPopover}
        seeLikers={seeLikers}
        likers={likers}
        showViewComment={showViewComment}
      />

      {commenting && (
        <View
          style={tw`bg-red-500 bg-opacity-50 absolute top-0 left-0 h-[${height}px]`}
        >
          <CommentForm postId={props.id} />
        </View>
      )}
    </View>
  )
}

export default Post
