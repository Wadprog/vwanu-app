import React from 'react'
import { View } from 'react-native'
import { formatDistanceToNow } from 'date-fns'

import tw from 'lib/tailwind'
import Text from './Text'
import ProfAvatar from './ProfAvatar'
import nameToPicture from 'lib/nameToPicture'
import { PostProps } from '../../types'
import LikeForm from './LikeForm'
import { useTheme } from 'hooks/useTheme'

interface CommentProps {
  comment: PostProps
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { isDarkMode } = useTheme()
  return (
    <View style={tw`p-4 border-b border-gray-${isDarkMode ? '700' : '100'}`}>
      <ProfAvatar
        size={20}
        source={
          comment.user?.profilePicture
            ? comment.user.profilePicture.toString()
            : (comment.user && nameToPicture(comment.user)) || ''
        }
        name={`${comment.user?.firstName} ${comment.user?.lastName}`}
        subtitle={comment.postText}
        subtitleParams={{
          maxLength: 150,
        }}
      />
      <View style={tw`flex-1 flex-row justify-between ml-3`}>
        <View style={tw`items-center mt-2`}>
          <Text style={tw`ml-1 font-thin text-xs pl-2`}>
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
        <LikeForm
          id={comment.id.toString()}
          isReactor={!!comment.isReactor}
          amountOfKorems={comment.amountOfKorems}
          koreHeight={16}
          flexDir="row"
        />
      </View>
    </View>
  )
}

export default Comment
