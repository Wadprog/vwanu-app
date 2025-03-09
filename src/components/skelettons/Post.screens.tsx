import { View } from 'react-native'
import { Skeleton } from 'moti/skeleton'
import tw from '../../lib/tailwind'

/**
 * Type definition for color mode options
 */
export type ColorMode = 'dark' | 'light'

/**
 * Props for the PostSkeleton component
 */
type PostSkeletonProps = {
  colorMode: ColorMode
  lastLineWidth: string | number
  hasPhotos?: boolean
}

/**
 * Spacer component to add vertical space
 */
const Spacer = ({ height = 16 }: { height?: number }) => (
  <View style={{ height }} />
)

/**
 * Post skeleton component for timeline
 * Renders a skeleton layout for a social media post
 */
const PostSkeleton = ({
  colorMode,
  lastLineWidth,
}: {
  colorMode: ColorMode
  lastLineWidth: string | number
}) => (
  <View style={tw`flex-row mb-4`}>
    <View style={tw`mr-3`}>
      <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
    </View>
    <View style={tw`flex-1 justify-center`}>
      <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={lastLineWidth as any} />
    </View>
  </View>
)

export default PostSkeleton
