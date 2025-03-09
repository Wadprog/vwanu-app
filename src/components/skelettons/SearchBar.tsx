import { View } from 'react-native'
import { Skeleton } from 'moti/skeleton'

import tw from '../../lib/tailwind'

// Define the correct type for colorMode
type ColorMode = 'dark' | 'light'

// Search Bar Component
const SearchBar = ({ colorMode }: { colorMode: ColorMode }) => (
  <View style={tw`flex-row items-center mb-6 px-1`}>
    <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
    <View style={tw`ml-2 flex-1`}>
      <Skeleton colorMode={colorMode} width="100%" height={40} radius={8} />
    </View>
  </View>
)

export default SearchBar
