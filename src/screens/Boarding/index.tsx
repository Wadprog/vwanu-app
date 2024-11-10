/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { useDispatch } from "react-redux";
import { View, Image, ImageBackground } from "react-native";

import tw from "../../lib/tailwind";
import images from "../../config/image";
import Text from "../../components/Text";
import Button from "../../components/Button";
import onBordingScreen from "./screenData";
import { boarded } from "../../store/auth";

const BoardingScreen: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = React.useState<number>(0);

  const handleNext = (screenCount: number, screens: number) => {
    if (screenCount < screens - 1) {
      setCurrentScreen(currentScreen + 1);
      return;
    }
    // @ts-ignore
    dispatch(boarded());
  };

  return (
    <ImageBackground style={tw`px-5 flex-1`} source={images.onBoardBg}>
      <View style={tw`flex-1 flex items-center mt-[30%] pt-5`}>
        <Image source={onBordingScreen[currentScreen].image} style={tw``} />
      </View>
      <View style={tw`flex bottom-0`}>
        <View style={tw`mb-9`}>
          <Text category="h6" style={tw`text-black mb-[7px] w-1/2`}>
            {onBordingScreen[currentScreen].title}
          </Text>
          <Text category="p1" style={tw`text-black w-3/4`}>
            {onBordingScreen[currentScreen].description}
          </Text>
        </View>
        <View style={tw` mb-9`}>
          <Button
            title="Next"
            onPress={() => {
              handleNext(currentScreen, onBordingScreen.length);
            }}
            style={tw`  mb-6`}
          />

          <Button
            disabled={currentScreen === onBordingScreen.length - 1}
            title="Skip"
            appearance="outline"
            onPress={() => {
              // @ts-ignore
              dispatch(boarded());
            }}
            style={tw`border-black bg-white ${
              currentScreen === onBordingScreen.length - 1 ? "opacity-0" : ""
            }`}
          />
        </View>
        <View style={tw` flex flex-row justify-center mb-9`}>
          <Text style={tw`text-black`}>Already have an account?</Text>
          <Text appearance="hint">Sign In</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BoardingScreen;
