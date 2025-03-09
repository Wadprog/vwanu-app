import { Skeleton } from 'moti/skeleton'
import { View } from 'react-native'
import tw from '../../lib/tailwind'

/**
 * Type definition for color mode options
 */
export type ColorMode = 'dark' | 'light'

/**
 * Props for the Spacer component
 */
type SpacerProps = {
  height?: number
}

/**
 * Props for the HamburgerMenu component
 */
type HamburgerMenuProps = {
  colorMode: ColorMode
  lineWidths?: [number, number, number]
  lineHeight?: number
  marginBottom?: number
}

/**
 * Simple spacer component to add vertical space
 */
export const Spacer = ({ height = 16 }: SpacerProps) => (
  <View style={{ height }} />
)

/**
 * Hamburger menu skeleton component
 * Displays three horizontal lines representing a navigation menu
 */
const HamburgerMenu = ({
  colorMode,
  lineWidths = [25, 20, 25],
  lineHeight = 3,
  marginBottom = 4,
}: HamburgerMenuProps) => (
  <View style={tw`mb-4 ml-1`}>
    <Skeleton colorMode={colorMode} width={lineWidths[0]} height={lineHeight} />
    <Spacer height={marginBottom} />
    <Skeleton colorMode={colorMode} width={lineWidths[1]} height={lineHeight} />
    <Spacer height={marginBottom} />
    <Skeleton colorMode={colorMode} width={lineWidths[2]} height={lineHeight} />
  </View>
)

export default HamburgerMenu
