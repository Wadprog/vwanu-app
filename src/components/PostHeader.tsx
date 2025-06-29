/*
Sub-Component: PostHeader 
   - Displays profile avatar and privacy settings,
     as well as a popover for deleting the post.
*/

import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import { Popover, Layout } from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import Text from './Text'
import tw from '../lib/tailwind'
import ProfAvatar from './ProfAvatar'
import PrivacyNotice from './PrivacyNotice'
import { PostProps, UpdatePost } from '../../types'
import { RootState } from '../store'
import nameToPicture from 'lib/nameToPicture'

interface PostHeaderProps extends PostProps {
  onDeletePress: () => void
  deletingVisible: boolean
  toggleDeleting: () => void
  updatePostMeta: { isLoading: boolean }
  updatePost: (data: UpdatePost) => void
  disableNavigation?: boolean
}

const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const user = useSelector((state: RootState) => state.auth)
  const PostUser = props.User
  const navigation = useNavigation()

  const handlePress = () => {
    // console.log('props', props)
    if (!props.disableNavigation) {
      // @ts-ignore
      navigation.navigate('SinglePost', { postId: props.id })
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={tw`flex flex-row justify-between items-center mb-2`}
    >
      <View style={tw`flex flex-row items-center`}>
        <ProfAvatar
          size={30}
          source={
            PostUser?.profilePicture
              ? PostUser?.profilePicture.toString()
              : (PostUser && nameToPicture(PostUser)) || ''
          }
          name={`${props.User?.firstName} ${props.User?.lastName}`}
          subtitle={formatDistanceToNow(
            new Date(props.createdAt || Date.now()),
            {
              addSuffix: true,
            }
          )}
          subtitleParams={{
            textStyles: 'text-white font-thin',
          }}
        />
        <PrivacyNotice
          privacyType={props.privacyType}
          canEdit={user.userId === props.User?.id}
          isEditing={props.updatePostMeta.isLoading}
          onEdit={async (newPrivacyType) => {
            try {
              await props.updatePost({
                id: props.id,
                data: { privacyType: newPrivacyType },
              })
            } catch (error) {
              console.error('Failed to update post privacy type', error)
            }
          }}
          style={`mt-5.2 ml-1`}
        />
      </View>
      {props.canDelete && (
        <Popover
          visible={props.deletingVisible}
          anchor={() => (
            <TouchableOpacity onPress={props.toggleDeleting}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={15}
                color="black"
              />
            </TouchableOpacity>
          )}
          onBackdropPress={props.toggleDeleting}
          backdropStyle={tw`bg-black/2`}
        >
          <Layout style={tw`bg-white p-5`}>
            <TouchableOpacity
              onPress={props.onDeletePress}
              style={tw`flex flex-row items-center`}
            >
              <Ionicons name="trash-outline" size={24} color="black" />
              <Text>Delete Post</Text>
            </TouchableOpacity>
          </Layout>
        </Popover>
      )}
    </TouchableOpacity>
  )
}

export default PostHeader
