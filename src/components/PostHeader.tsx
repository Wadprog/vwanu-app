/*
Sub-Component: PostHeader 
   - Displays profile avatar and privacy settings,
     as well as a popover for deleting the post.
*/

import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import { Popover, Layout } from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'

import { useSelector } from 'react-redux'

import Text from './Text'
import tw from '../lib/tailwind'
import ProfAvatar from './ProfAvatar'
import PrivacyNotice from './PrivacyNotice'

import { PostProps, UpdatePost } from '../../types'
import { RootState } from '../store'

interface PostHeaderProps extends PostProps {
  onDeletePress: () => void
  deletingVisible: boolean
  toggleDeleting: () => void
  updatePostMeta: { isLoading: boolean }
  updatePost: (data: UpdatePost) => void
}

const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const user = useSelector((state: RootState) => state.auth)

  return (
    <View style={tw`flex flex-row justify-between items-center mb-2`}>
      <View style={tw`flex flex-row`}>
        <ProfAvatar
          size={50}
          source={props.User?.profilePicture || ''}
          name={`${props.User?.firstName} ${props.User?.lastName}`}
          subtitle={formatDistanceToNow(
            new Date(props.createdAt || Date.now()),
            {
              addSuffix: true,
            }
          )}
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
        />
      </View>
      {props.canDelete && (
        <Popover
          visible={props.deletingVisible}
          anchor={() => (
            <TouchableOpacity onPress={props.toggleDeleting}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={24}
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
    </View>
  )
}

export default PostHeader
