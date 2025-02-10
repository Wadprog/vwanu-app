import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'

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
                  !rightColumn.length
                    ? 'rounded-r-lg bg-red-500'
                    : 'bg-green-800'
                } `,
                {
                  width: !!rightColumn.length ? width / 2 - 24 : width - 24,
                },
              ]}
              onPress={() => {
                props?.onImageTouch?.(image.id)
              }}
            >
              <Image
                source={{ uri: image.original }}
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
              tw`rounded-r-lg overflow-hidden `,
              {
                width: Dimensions.get('screen').width / 2,
              },
            ]}
          >
            {rightColumn.map((image) => (
              <TouchableOpacity
                key={image.id}
                style={styles.imageContainer}
                onPress={() => {
                  props?.onImageTouch?.(image.id)
                }}
              >
                <Image
                  source={{ uri: image.original }}
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
