import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { View, Platform } from 'react-native'
import { Input } from '@ui-kitten/components'

import tw from 'lib/tailwind'
import Img from 'assets/svg/Image'
import useToggle from 'hooks/useToggle'
import PostInputModal from '../PostInputModal'
import { useFetchProfileQuery } from 'store/profiles'
import { RootState } from 'store'
import { useTheme } from 'hooks/useTheme'

const shadowStyle = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
}

interface PostInputProps {
  communityId?: string
}

const PostInput: React.FC<PostInputProps> = ({ communityId }) => {
  const { userId } = useSelector((state: RootState) => state.auth)
  const { data: user } = useFetchProfileQuery(userId!)
  const { isDarkMode } = useTheme()
  const [creatingPost, toggleCreatingPost] = useToggle(false)
  const [openBottomSheet, toggleOpenBottomSheet] = useToggle(false)

  return (
    <View style={[tw`px-1`, shadowStyle]}>
      <View style={tw`flex flex-row my-2`}>
        <Avatar.Image
          source={{
            uri:
              (user?.profilePicture as any)?.original ||
              `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`,
          }}
          size={50}
        />
        <View style={tw`flex-1 ml-2`}>
          <Input
            editable={false}
            autoFocus
            placeholder="What's on your mind?"
            onPressIn={() => toggleCreatingPost()}
            style={tw`border-[${
              isDarkMode ? 'white' : (tw.color('text-primary') as string)
            }] border-[1px] bg-white rounded-2xl mb-0`}
            accessoryRight={<Img />}
            disabled={true}
          />
        </View>
      </View>
      <PostInputModal
        visible={creatingPost}
        onClose={() => toggleCreatingPost()}
        openBottomSheet={openBottomSheet}
        communityId={communityId}
      />
    </View>
  )
}

export default PostInput
