import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { View, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'

import Input from './Input'
import tw from 'lib/tailwind'
import Img from 'assets/svg/Image'
import useToggle from 'hooks/useToggle'
import PostInputModal from './PostInputModal'
import { getCurrentUser } from 'store/auth'

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

const PostInput = () => {
  const user = useSelector(getCurrentUser)
  const [creatingPost, toggleCreatingPost] = useToggle(false)
  const [openBottomSheet, toggleOpenBottomSheet] = useToggle(false)
  // const navigation = useNavigation()
  const handleIconRightPress = async () => {
    console.log('I will try now man')
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status === 'granted') {
        toggleCreatingPost()
        toggleOpenBottomSheet()
      } else {
        // If permission is not granted, handle accordingly
        console.log(
          'We will navigate to a permission request page or show a prompt'
        )
        // navigation.navigate('PermissionRequestPage')
      }
    } catch (error) {
      console.error('Error requesting media library permission:', error)
    }
  }

  return (
    <View style={[tw`px-1`, shadowStyle]}>
      <View style={tw`flex flex-row  my-2`}>
        <Avatar.Image
          source={{
            uri:
              user?.profile?.profilePicture ||
              `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`,
          }}
          size={50}
        />
        <View style={tw`flex-1 ml-2`}>
          <Input
            disabled
            editable={false}
            autoFocus
            placeholder="What's on your mind?"
            onPressIn={toggleCreatingPost}
            style={tw`border-[#F2F3F5] border-[1px] bg-white rounded-2xl mb-0`}
            iconRight={<Img />}
            onIconRightPress={() => {
              handleIconRightPress()
            }}
          />
        </View>
      </View>
      <PostInputModal
        visible={creatingPost}
        onClose={toggleCreatingPost}
        openBottomSheet={openBottomSheet}
      />
    </View>
  )
}

export default PostInput
