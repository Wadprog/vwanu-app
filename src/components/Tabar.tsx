import { View, TouchableOpacity, LayoutChangeEvent } from "react-native";
import React from "react";

import Text from "./Text";
import tw from "../lib/tailwind";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

enum Tab {
  tab1,
  tab2,
}

interface TabarProps {
  titles: string[];
  onSelectTab: (index: number) => void;
}

const Tabar: React.FC<TabarProps> = ({ titles, onSelectTab }) => {
  const [activeTab, setActiveTab] = React.useState<Tab>(Tab.tab1);
  const [dimensions, setDimensions] = React.useState({ width: 1, height: 1 });

  const tabPositionx = useSharedValue(0);
  const buttonWidth = dimensions.width / titles.length;

  const handlePress = (index: number) => {
    setActiveTab(index);
  };
  const onTabPress = (index: number) => {
    tabPositionx.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
    onSelectTab(index);
  };
  const onTabarLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionx.value }],
    };
  });
  return (
    <View style={tw` relative flex-1`}>
      <Animated.View
        style={[
          {
            height: dimensions.height,
            width: buttonWidth - 10,
            marginHorizontal: 5,
            backgroundColor: "white",
            position: "absolute",
            borderRadius: 15,
            shadowColor: "blue",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
          },
          animatedStyle,
        ]}
      />
      <View onLayout={onTabarLayout} style={tw` flex flex-row justify-center`}>
        {titles.map((title, index) => (
          <TabButton
            title={title}
            key={index}
            selected={activeTab === index}
            onPress={() => {
              onTabPress(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const TabButton: React.FC<{
  title: string;
  selected: boolean;
  onPress: () => void;
}> = ({ selected, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[tw` flex-1 p-2 rounded-full`]}>
      <Text style={tw`text-center ${selected ? "text-primary" : ""}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Tabar;
