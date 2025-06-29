import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import tw from '../lib/tailwind'
import { Media } from '../../types'
import { splitImages } from '../lib/splitImages'

/**
 * Props for the ImageGrid component.
 *
 * @interface ImageGridProps
 * @property {Media[]} medias - An array of media objects to be displayed in the grid.
 * @property {any} [style] - Optional custom styles to be applied to the grid.
 * @property {(id: number) => void} [onImageTouch] - Optional callback function to handle image touch events, receives the image id as a parameter.
 */
interface ImageGridProps {
  medias: Media[]
  style?: any
  onImageTouch?: (id: number) => void
}

const ImageGrid: React.FC<ImageGridProps> = (props) => {
  const { width } = Dimensions.get('screen')
  const { leftColumn, rightColumn } = splitImages(props.medias)

  // Check if video support is available
  const hasVideoSupport = () => {
    try {
      require('expo-av')
      return true
    } catch {
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
        uri.includes('video') ||
        uri.includes('.webm'))
    )
  }

  // Component to render media (image or video)
  const MediaItem = ({ item, style }: { item: Media; style: any }) => (
    <View style={[style, { position: 'relative' }]}>
      {hasVideoSupport() && isVideo(item.original) ? (
        <>
          <Video
            source={{ uri: item.original }}
            style={style}
            resizeMode={ResizeMode.COVER}
            shouldPlay={false}
            isLooping={false}
            isMuted={true}
          />
          {/* Video play icon overlay */}
          <View
            style={[
              StyleSheet.absoluteFillObject,
              tw`flex justify-center items-center`,
            ]}
          >
            <View style={tw`bg-black bg-opacity-50 rounded-full p-3`}>
              <MaterialCommunityIcons name="play" size={32} color="white" />
            </View>
          </View>
        </>
      ) : (
        <Image
          source={{ uri: item.original }}
          style={style}
          resizeMode="cover"
        />
      )}
    </View>
  )

  return (
    <View>
      <ScrollView
        contentContainerStyle={tw`flex flex-row`}
        showsVerticalScrollIndicator={false}
      >
        {/* Left Column */}
        <View>
          {leftColumn.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={[
                tw`rounded-l-lg overflow-hidden  ${
                  !rightColumn.length ? 'rounded-r-lg' : ''
                }`,
                {
                  width: !!rightColumn.length ? width / 2 - 24 : width - 24,
                  marginBottom: 2,
                },
              ]}
              onPress={() => {
                props?.onImageTouch?.(image.id)
              }}
            >
              <MediaItem
                item={image}
                style={{
                  width: !!rightColumn.length ? width / 2 - 4 : width - 8,
                  height: image.height,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Column */}
        {!!rightColumn.length && (
          <View
            style={[
              tw`rounded-r-lg overflow-hidden`,
              {
                width: Dimensions.get('screen').width / 2,
              },
            ]}
          >
            {rightColumn.map((image) => (
              <TouchableOpacity
                key={image.id}
                style={[
                  tw`rounded-r-lg overflow-hidden ml-2`,
                  // styles.imageContainer,
                  {
                    marginBottom: 2,
                  },
                ]}
                onPress={() => {
                  props?.onImageTouch?.(image.id)
                }}
              >
                <MediaItem
                  item={image}
                  style={{
                    width: Dimensions.get('screen').width / 2,
                    height: image.height,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    margin: 2,
    maxWidth: Dimensions.get('screen').width - 16,
  },
})
