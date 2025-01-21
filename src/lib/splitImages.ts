import { Dimensions } from 'react-native'
import { Media } from '../../types'

interface SplitImages {
  leftColumn: Media[]
  rightColumn: Media[]
}

/**
 * Distributes images into two columns, but first linearly scales
 * each image's height into the range [100, screenHeight/2].
 */
export const splitImages = (images: Media[]): SplitImages => {
  const screenHeight = Dimensions.get('window').height

  // We want to map heights into [minMapped, maxMapped]
  const minMapped = 100
  const maxMapped = screenHeight * 0.4

  // Special case: if there's only one image, just map it and put in left column
  if (images.length === 1) {
    const single = images[0]
    const scaledHeight = clampHeight(
      single.height,
      images,
      minMapped,
      maxMapped
    )
    return {
      leftColumn: [{ ...single, height: scaledHeight }],
      rightColumn: [],
    }
  }

  // 1) Determine the min & max original heights
  const heights = images.map((img) => img.height)
  const minOriginal = Math.min(...heights)
  const maxOriginal = Math.max(...heights)

  // 2) Map every image's height linearly into [minMapped, maxMapped]
  const scaledImages = images.map((img) => {
    const newHeight = linearMap(
      img.height,
      minOriginal,
      maxOriginal,
      minMapped,
      maxMapped
    )
    return { ...img, height: newHeight }
  })

  // 3) Distribute the scaled images into two columns (waterfall layout)
  const leftColumn: Media[] = []
  const rightColumn: Media[] = []
  let leftHeight = 0
  let rightHeight = 0

  scaledImages.forEach((image) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(image)
      leftHeight += image.height
    } else {
      rightColumn.push(image)
      rightHeight += image.height
    }
  })

  return { leftColumn, rightColumn }
}

/**
 * linearly map a value from [inMin, inMax] to [outMin, outMax].
 * If inMin == inMax, it returns the midpoint of [outMin, outMax].
 */
function linearMap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMin === inMax) {
    // all images have the same height
    return (outMin + outMax) / 2
  }
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin)
}

/**
 * Helper for single-image scenario: linearly scale that single image
 * in context with min & max from the entire set. But if there's only one,
 * we basically just clamp it to [minMapped, maxMapped].
 */
function clampHeight(
  value: number,
  images: Media[],
  minMapped: number,
  maxMapped: number
) {
  // If there's only one image, just clamp it (not a true linear map).
  if (value < minMapped) return minMapped
  if (value > maxMapped) return maxMapped
  return value
}
