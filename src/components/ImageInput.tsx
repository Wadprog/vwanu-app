import React from 'react'
import { TextInputProps } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Image, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import tw from '../lib/tailwind'

export interface ImageInputProps extends TextInputProps {
  uri?: string
  onChangeImage: (uri: string) => void
  style?: object
  disableChangeImage?: boolean
  otherProps?: React.ComponentProps<typeof Image>
  InitialImage?: React.ReactNode
}
const ImageInput: React.FC<ImageInputProps> = ({ InitialImage, ...props }) => {
  const [loadingImageGalerry, setLoadingImageGallery] =
    React.useState<boolean>(false)
  const handleChange = async () => {
    if (props.disableChangeImage || loadingImageGalerry) return
    setLoadingImageGallery(true)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    })
    setLoadingImageGallery(false)
    if (!result.canceled) {
      props.onChangeImage(result.assets[0].uri)
    }
  }
  return (
    <TouchableOpacity
      onPress={handleChange}
      style={[
        tw`bg-gray-200 rounded-2xl w-[106px] h-[118px] flex justify-center items-center m-2 overflow-hidden `,
        props.style,
      ]}
    >
      {loadingImageGalerry ? (
        <MaterialCommunityIcons name="loading" size={30} />
      ) : (
        <>
          {!props.uri && (
            <>
              {InitialImage ? (
                InitialImage
              ) : (
                <MaterialCommunityIcons name="camera" size={30} />
              )}
            </>
          )}
          {props.uri && (
            <Image
              source={{ uri: props.uri }}
              style={tw` w-full h-full`}
              {...props.otherProps}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export default ImageInput
