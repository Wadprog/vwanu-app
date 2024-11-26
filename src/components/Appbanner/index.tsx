import { View, ImageBackground, FlatList, Dimensions } from "react-native";
import React from "react";

interface Banner {
  title: string;
  tagLine: string;
  backgroundImage: string;
}

import Text from "../Text";
import tw from "../../lib/tailwind";
import NavigatorIndicators from "../NavigationDots";
import { useFetcBannersQuery } from "../../store/banner";

const { width, height } = Dimensions.get("screen");
const Banner: React.FC<Banner> = (props) => {
  const { data = [] } = useFetcBannersQuery();
  const bannerRef = React.useRef<FlatList>(null);
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  // change the slide every 5 secs
  /*
  const handleSlice = () => {
    if (currentSlide === data.length) setCurrentSlide(0)
    bannerRef.current?.scrollToIndex({
      index: currentSlide,
      animated: true,
    })
    setCurrentSlide(1)
  }

  React.useEffect(() => {
    const interval = setInterval(handleSlice, 500)
    return () => clearInterval(interval)
  }, [currentSlide]) */

  return (
    <FlatList
      ref={bannerRef}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <View
          style={tw`rounded-lg overflow-hidden w-[${width - 24}px] h-[${
            height / 4 + 24
          }px] mb-1 bg-red-500`}
        >
          <ImageBackground
            source={{ uri: item.backgroundImage }}
            style={tw`h-[162px] `}
          >
            <View
              style={tw`bg-black bg-opacity-30 h-full flex justify-center items-center`}
            >
              <View style={tw`relative`}>
                <Text category="h3" style={tw`text-center`}>
                  {item.title}
                </Text>
                <Text category="s1" style={tw`text-center mt-4 mb-5`}>
                  {item.tagLine}
                </Text>
                <View style={tw` flex self-end mt-3  `}>
                  <NavigatorIndicators selected={index} total={4} />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  );
};

export default Banner;
