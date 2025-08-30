import React from 'react'
import { View, Image, ImageBackground } from 'react-native'

import tw from 'lib/tailwind'
import images from 'config/image'
import Text from 'components/Text'
import Button from 'components/Button'
import { setNextAction, NextActions } from 'store/auth-slice'
import { useDispatch } from 'react-redux'
const LogSignup: React.FC<{}> = () => {
  const dispatch = useDispatch()

  return (
    <ImageBackground style={tw`px-5 flex-1`}>
      <View style={tw`flex-1 flex items-center mt-[30%] pt-5`}>
        <Image source={images.connectedPeople[0]} style={tw``} />
      </View>
      <View style={tw`flex bottom-0`}>
        <View style={tw`mb-9`}>
          <Text category="h6" style={tw`text-black mb-[7px] text-center`}>
            Connect with friends and the world around you.
          </Text>
          <Text category="p1" style={tw`text-black text-center`}>
            Get Connected today, and be an influencer in your community.Your
            voice matters.
          </Text>
        </View>
        <View style={tw` mb-9`}>
          <Button
            title="Create account"
            onPress={() => {
              dispatch(setNextAction(NextActions.SIGNED_UP))
            }}
            style={tw`  mb-6`}
          />

          <Button
            title="Login"
            appearance="outline"
            onPress={() => {
              dispatch(setNextAction(NextActions.SIGNED_IN))
            }}
            style={tw`border-primary bg-white`}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default LogSignup
