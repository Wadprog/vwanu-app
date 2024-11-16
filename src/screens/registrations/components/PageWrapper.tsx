import React from "react";

import { View, ImageBackground } from "react-native";

import tw from "../../../lib/tailwind";
import images from "../../../config/image";
import Screen from "../../../components/screen";
import PageTitles from "../../../components/PageTitles";
import NavigationDots from "../../../components/NavigationDots";

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  pageNumber: number;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  subtitle,
  children,
  pageNumber,
}) => {
  return (
    <Screen>
      <ImageBackground
        style={tw`px-5 flex-1 flex content-center justify-center`}
        source={images.regiterBg}
      >
        <View style={tw`mb-5 mt-10`}>
          <PageTitles title={title} subtitle={subtitle} />
        </View>
        {children}

        <View style={tw`mb-10`}>
          <NavigationDots selected={pageNumber} total={4} />
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default PageWrapper;
