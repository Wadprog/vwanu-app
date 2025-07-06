import React from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-paper'
import userToPictureUrl from 'lib/nameToPicture'

import tw from '../lib/tailwind'
import { User } from '../../types'

interface AvatarGroupProps {
  avatars: User[]
  style?: Object
}
const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const profilePictureToUrl = (
    profilePicture: string | { original: string }
  ) => {
    if (typeof profilePicture === 'string') {
      return profilePicture
    }
    return profilePicture.original
  }

  return (
    <View style={[tw`flex flex-row items-center`, props.style || {}]}>
      {props.avatars.map((avatar, index) => (
        <Avatar.Image
          key={index}
          source={{
            uri: avatar.profilePicture
              ? profilePictureToUrl(avatar.profilePicture)
              : userToPictureUrl(avatar),
          }}
          size={30}
          style={tw`border border-primary ${index && '-ml-2'}`}
        />
      ))}
    </View>
  )
}

export default AvatarGroup
