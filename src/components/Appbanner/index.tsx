import { View, ImageBackground } from "react-native";
import React from "react";

interface BannerProps {
  // image_uri: string;
  // title: string;
  // description: string;
  // navigationNumber: number;
  // repeat: boolean;
}

import Text from "../Text";
import image from "../../config/image";
import tw from "../../lib/tailwind";
import NavigatorIndicators from "../NavigationDots";

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <View style={tw`rounded-lg overflow-hidden`}>
      <ImageBackground source={image.Home_pic} style={tw`h-[162px] `}>
        <View
          style={tw`bg-black bg-opacity-30 h-full flex justify-center items-center`}
        >
          <View style={tw`relative`}>
            <Text category="h3" style={tw`text-center`}>
              Welcome to Vwanu
            </Text>
            <Text category="s1" style={tw`text-center mt-4 mb-5`}>
              The best place to find your dream home
            </Text>
            <View style={tw` flex self-end mt-3  `}>
              <NavigatorIndicators selected={0} total={4} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Banner;
