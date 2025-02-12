import React from 'react'
import { ViewPager } from '@ui-kitten/components'
import { View, Image, ImageBackground } from 'react-native'

import tw from '../../lib/tailwind'
import images from '../../config/image'
import Text from '../../components/Text'
import onBordingScreen from './screenData'
import Button from '../../components/Button'
import useAuthContext, { AuthState } from 'hooks/useAuthContext'

const BoardingScreen: React.FC<{}> = () => {
  const { dispatch } = useAuthContext()
  const [currentScreen, setCurrentScreen] = React.useState<number>(0)

  const handleNext = (screenCount: number, screens: number) => {
    if (screenCount < screens - 1) {
      setCurrentScreen(currentScreen + 1)
      return
    }
    dispatch({ type: AuthState.SIGNED_IN_SIGNED_UP })
  }

  return (
    <ViewPager
      selectedIndex={currentScreen}
      onSelect={(index) => setCurrentScreen(index)}
      style={tw`flex-1`}
    >
      {onBordingScreen.map((screen, index) => (
        <ImageBackground
          style={tw`px-5 flex-1`}
          source={images.onBoardBg}
          key={index.toString()}
        >
          <View style={tw`flex-1 flex items-center mt-[30%] pt-5`}>
            <Image source={screen.image} style={tw``} />
          </View>
          <View style={tw`flex bottom-0`}>
            <View style={tw`mb-9`}>
              <Text category="h6" style={tw`text-black mb-[7px] w-1/2`}>
                {screen.title}
              </Text>
              <Text category="p1" style={tw`text-black w-3/4`}>
                {screen.description}
              </Text>
            </View>
            <View style={tw` mb-9`}>
              <Button
                title="Next"
                onPress={() => {
                  handleNext(currentScreen, onBordingScreen.length)
                }}
                style={tw`  mb-6`}
              />

              <Button
                disabled={currentScreen === onBordingScreen.length - 1}
                title="Skip"
                appearance="outline"
                onPress={() => {
                  dispatch({ type: AuthState.SIGNED_IN_SIGNED_UP })
                }}
                style={tw`border-black bg-white ${
                  currentScreen === onBordingScreen.length - 1
                    ? 'opacity-0'
                    : ''
                }`}
              />
            </View>

            <Text style={tw`text-center mb-9`}>Together we are stronger!</Text>
          </View>
        </ImageBackground>
      ))}
    </ViewPager>
  )
}

export default BoardingScreen
