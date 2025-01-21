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
              style={styles.imageContainer}
              onPress={() => {
                props?.onImageTouch?.(image.id)
              }}
            >
              <Image
                source={{ uri: image.original }}
                style={{
                  width: rightColumn.length ? width / 2 - 4 : width - 8,
                  height: image.height,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Column */}
        {rightColumn.length && (
          <View>
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
                    width: Dimensions.get('screen').width / 2 - 8,
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

/**
 * linearly map a value from [inMin, inMax] to [outMin, outMax].
 * If inMin == inMax, it returns the midpoint of [outMin, outMax].
 */
/*function linearMap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMin === inMax) {
    // all images have the same height
    return (outMin + outMax) / 2;
  }
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

const splitImages = (images: Medias[]): SplitImages => {
  const screenHeight = Dimensions.get("window").height;

   // We want to map heights into [minMapped, maxMapped]
  const minMapped = 100;
  const maxMapped = screenHeight / 2;

  // If there's exactly one image, cap its height and return immediately.
  if (images.length === 1) {
    const single = images[0];
    const cappedHeight = single.height > screenHeight ? screenHeight : single.height;
    return {
      leftColumn: [{ ...single, height: cappedHeight }],
      rightColumn: [],
    };
  }

  // 1) Determine the min & max original heights
  const heights = images.map((img) => img.height);
  const minOriginal = Math.min(...heights);
  const maxOriginal = Math.max(...heights);

    const scaledImages = images.map((img) => {
    const newHeight = linearMap(
      img.height,
      minOriginal,
      maxOriginal,
      minMapped,
      maxMapped
    );
    return { ...img, height: newHeight };
  });

  // Otherwise, cap each image individually so none exceed screen height.
  const cappedImages = images.map((img) => {
    const newHeight = img.height > screenHeight ? screenHeight : img.height;
    return { ...img, height: newHeight };
  });

  // Distribute the images into left/right columns, balancing total column height.
  const leftColumn: Medias[] = [];
  const rightColumn: Medias[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  cappedImages.forEach((image) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(image);
      leftHeight += image.height;
    } else {
      rightColumn.push(image);
      rightHeight += image.height;
    }
  });

  return { leftColumn, rightColumn };
};
// export const splitImages = (images: Medias[]): SplitImages => {
//   // The height of the visible screen (excluding status bar).
//   const screenHeight = Dimensions.get("window").height;

//   // Sum all original image heights.
//   const totalHeight = images.reduce((sum, img) => sum + (img.height || 0), 0);

//   // If no images or totalHeight is zero, just put them all in left column.
//   if (totalHeight <= 0) {
//     return { leftColumn: images, rightColumn: [] };
//   }

//   // Determine how much we need to scale so that the TOTAL doesn't exceed screen height.
//   // If total is smaller than screen height, no scale needed (scaleFactor = 1).
//   const scaleFactor = totalHeight > screenHeight ? screenHeight / totalHeight : 1;

//   // First, apply the total scale factor; then ensure no single image > screenHeight.
//   const scaledImages = images.map((img) => {
//     // Base scaled height
//     let newHeight = (img.height || 0) * scaleFactor;

//     // Cap each image so it never exceeds screen height individually.
//     if (newHeight > screenHeight) {
//       newHeight = screenHeight;
//     }

//     return { ...img, height: newHeight };
//   });

//   // Distribute scaled images into two columns, balancing total column heights.
//   const leftColumn: Medias[] = [];
//   const rightColumn: Medias[] = [];
//   let leftHeight = 0;
//   let rightHeight = 0;

//   scaledImages.forEach((img) => {
//     if (leftHeight <= rightHeight) {
//       leftColumn.push(img);
//       leftHeight += img.height;
//     } else {
//       rightColumn.push(img);
//       rightHeight += img.height;
//     }
//   });

//   return { leftColumn, rightColumn };
// };
*/
