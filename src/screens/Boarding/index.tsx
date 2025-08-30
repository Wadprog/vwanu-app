import React from 'react'
import { ViewPager } from '@ui-kitten/components'
import { View, Image, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import onBoardingScreen from './screenData'
import Button from '../../components/Button'
import { setNextAction, NextActions } from 'store/auth-slice'
import AgeScreen from './AgeScreen'
import Screen from 'components/screen'

const BoardingScreen: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const [currentScreen, setCurrentScreen] = React.useState<number>(0)
  const { birthdate } = useSelector((state: RootState) => state.auth)

  const handleNext = (screenCount: number, screens: number) => {
    if (screenCount < screens - 1) {
      setCurrentScreen(currentScreen + 1)
      return
    }

    dispatch(setNextAction(NextActions.SIGNED_IN_SIGNED_UP))
  }

  return (
    <Screen safeArea={false}>
      <ViewPager
        selectedIndex={currentScreen}
        onSelect={(index) => setCurrentScreen(index)}
        style={tw`flex-1`}
      >
        {onBoardingScreen.map((screen, index) => (
          <ImageBackground style={tw`px-5 flex-1`} key={index.toString()}>
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
              {screen.input ? (
                <AgeScreen />
              ) : (
                <View style={tw` mb-9`}>
                  <Button
                    title="Next"
                    onPress={() => {
                      handleNext(currentScreen, onBoardingScreen.length)
                    }}
                    style={tw`  mb-6`}
                  />

                  <Button
                    disabled={currentScreen === onBoardingScreen.length - 1}
                    title="Skip"
                    appearance="outline"
                    onPress={() => {
                      birthdate
                        ? dispatch(
                            setNextAction(NextActions.SIGNED_IN_SIGNED_UP)
                          )
                        : setCurrentScreen(onBoardingScreen.length - 1) // last screen to set age
                    }}
                    style={tw`border-primary bg-white ${
                      currentScreen === onBoardingScreen.length - 1
                        ? 'opacity-0'
                        : ''
                    }`}
                  />
                </View>
              )}

              <Text style={tw`text-center mb-9`}>
                Together we are stronger!
              </Text>
            </View>
          </ImageBackground>
        ))}
      </ViewPager>
    </Screen>
  )
}

export default BoardingScreen
