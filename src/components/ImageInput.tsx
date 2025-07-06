import React from 'react'
import { TextInputProps, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Image, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Video, ResizeMode } from 'expo-av'

import tw from '../lib/tailwind'

export interface ImageInputProps extends TextInputProps {
  uri?: string
  onChangeImage: (uri: string) => void
  style?: object
  disableChangeImage?: boolean
  otherProps?: React.ComponentProps<typeof Image>
  InitialImage?: React.ReactNode
  mediaType?: 'image' | 'video'
}
const ImageInput: React.FC<ImageInputProps> = ({ InitialImage, ...props }) => {
  const [loadingImageGalerry, setLoadingImageGallery] =
    React.useState<boolean>(false)

  // Check if video support is available
  const hasVideoSupport = () => {
    try {
      require('expo-av')
      console.log('ImageInput: Video support available')
      return true
    } catch {
      console.log('ImageInput: Video support not available')
      return false
    }
  }

  // Helper function to determine if the URI is a video
  const isVideo = (uri: string) => {
    return (
      uri &&
      (uri.includes('.mp4') ||
        uri.includes('.mov') ||
        uri.includes('.avi') ||
        uri.includes('video'))
    )
  }
  const handleChange = async () => {
    if (props.disableChangeImage || loadingImageGalerry) return

    console.log('ImageInput: Starting image picker...')
    setLoadingImageGallery(true)

    try {
      // Request permissions first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      console.log('ImageInput: Permission status:', status)

      if (status !== 'granted') {
        console.log('ImageInput: Permission denied')
        setLoadingImageGallery(false)
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: hasVideoSupport()
          ? ImagePicker.MediaTypeOptions.All
          : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
        ...(hasVideoSupport() && {
          videoQuality: 1, // Medium quality
          videoMaxDuration: 60,
        }),
      })

      console.log('ImageInput: Picker result:', result)
      setLoadingImageGallery(false)

      if (!result.canceled) {
        const asset = result.assets[0]
        console.log('ImageInput: Selected asset:', asset.uri)
        props.onChangeImage(asset.uri)
      }
    } catch (error) {
      console.error('ImageInput: Error opening image picker:', error)
      setLoadingImageGallery(false)
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
            <>
              {hasVideoSupport() && isVideo(props.uri) ? (
                <View style={tw`w-full h-full relative`}>
                  <Video
                    source={{ uri: props.uri }}
                    style={tw`w-full h-full`}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}
                    isLooping={false}
                    isMuted={true}
                  />
                  {/* Video play icon overlay */}
                  <View
                    style={tw`absolute inset-0 flex justify-center items-center`}
                  >
                    <View style={tw`bg-black bg-opacity-50 rounded-full p-2`}>
                      <MaterialCommunityIcons
                        name="play"
                        size={24}
                        color="white"
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <Image
                  source={{ uri: props.uri }}
                  style={tw` w-full h-full`}
                  {...props.otherProps}
                />
              )}
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export default ImageInput
