import { View } from 'react-native'

import tw from 'lib/tailwind'
import animation from 'config/animations'
import AnimationLoader from 'components/AnimationLoader'

const PageLoading = () => {
  return (
    <View style={tw`bg-color-primary-900 flex-1`}>
      <AnimationLoader
        source={animation.loading}
        autoPlay
        loop
        style={tw` w-full h-full`}
      />
    </View>
  )
}

export default PageLoading
