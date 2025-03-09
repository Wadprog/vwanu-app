import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { StyleSheet, View } from 'react-native'

import tw from '../../lib/tailwind'
import SearchBar from '../../components/skelettons/SearchBar'
import SkeletonPost from '../../components/skelettons/Post.screens'
import { ColorMode } from '../../components/skelettons/Hamburger.screen'

/**
 * Props for the TwoColumnHeader component
 */
type TwoColumnHeaderProps = {
  colorMode: ColorMode
  leftWidth?: number
  leftHeight?: number
  rightWidth?: number
  rightHeight?: number
}

/**
 * Header component with two text columns - typically used for section titles
 */
const TwoColumnHeader = ({ colorMode }: TwoColumnHeaderProps) => (
  <View style={tw`flex-row justify-between items-center mb-5 px-1`}>
    <Skeleton colorMode={colorMode} width={100} height={10} />
    <Skeleton colorMode={colorMode} width={40} height={10} />
  </View>
)

export default function HelloWorld() {
  const colorMode: ColorMode = 'light'

  // Array of post configurations for variation
  const posts = [
    { id: 1, lastLineWidth: '90%' },
    { id: 2, lastLineWidth: '85%' },
    { id: 3, lastLineWidth: '95%' },
    { id: 4, lastLineWidth: '80%' },
  ]

  return (
    <MotiView
      transition={{ type: 'timing' }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: tw.color('white') }}
    >
      <SearchBar colorMode={colorMode} />
      <TwoColumnHeader colorMode={colorMode} />
      {posts.map((post) => (
        <SkeletonPost
          key={post.id}
          colorMode={colorMode}
          lastLineWidth={post.lastLineWidth}
        />
      ))}
    </MotiView>
  )
}

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  padded: {
    padding: 16,
  },
})
