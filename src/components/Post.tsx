import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Dimensions } from 'react-native'

import tw from '../lib/tailwind'
import ImageGrid from './ImageGrid'
import AvatarGroup from './AvatarGroups'
import useToggle from '../hooks/useToggle'
import { useUpdatePostMutation } from '../store/post'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { PostProps } from '../../types'
import LongText from './LongText'

const { height } = Dimensions.get('screen')

interface Props extends PostProps {
  showViewComment?: boolean
  disableNavigation?: boolean
  toggleCommenting: () => void
}
const Post: React.FC<Props> = ({
  showViewComment = true,
  toggleCommenting,
  ...props
}) => {
  const navigation = useNavigation()
  const [modifying, toggleModifying] = useToggle(false)
  const [seeLikers, toggleLikerPopover] = useToggle(false)
  const [updatePost, updatePostMeta] = useUpdatePostMutation()

  return (
    <View style={tw`static my-3`}>
      <PostHeader
        {...props}
        updatePostMeta={updatePostMeta}
        onDeletePress={toggleModifying}
        toggleDeleting={toggleModifying}
        deletingVisible={modifying}
        updatePost={updatePost}
      />

      {props.postText && (
        <LongText style={tw`text-gray-500  font-thin`} text={props.postText} />
      )}

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
        showViewComment={showViewComment}
      />
    </View>
  )
}

export default Post
