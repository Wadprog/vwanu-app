import { View, Text } from "react-native";
import React from "react";

interface BannerProps {
  image_uri: string;
  title: string;
  description: string;
  navigationNumber: number;
  repeat: boolean;
}
const Banner: React.FC<BannerProps> = () => {
  return (
    <View>
      <Text>Banner</Text>
    </View>
  );
};

export default Banner;
