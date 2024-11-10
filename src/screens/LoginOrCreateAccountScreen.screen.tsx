import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, ImageBackground } from "react-native";

import tw from "../lib/tailwind";
import images from "../config/image";
import Text from "../components/Text";
import Button from "../components/Button";
import routes from "../navigation/routes";

const LogSignup: React.FC<{}> = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground style={tw`px-5 flex-1`} source={images.onBoardBg}>
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
              // @ts-ignore
              navigation.navigate(routes.SIGN_UP);
            }}
            style={tw`  mb-6`}
          />

          <Button
            title="Login"
            appearance="outline"
            onPress={() => {
              // @ts-ignore
              navigation.navigate(routes.LOGIN);
            }}
            style={tw`border-black bg-white`}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LogSignup;
