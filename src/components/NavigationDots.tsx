import React from "react";
import { View } from "react-native";

import tw from "../lib/tailwind";

interface DotsProps {
  selected: boolean;
  style?: object;
  hidleColor?: string;
}
const Dots: React.FC<DotsProps> = ({
  selected,
  style,
  hidleColor = "bg-gray-300",
  ...props
}) => (
  <View
    style={[
      tw` rounded-3xl h-[10px] ${
        selected ? "w-[15px] bg-primary " : `w-[10px] ${hidleColor}`
      }`,
      style,
    ]}
    {...props}
  />
);

interface NavigatorIndicatorsProps {
  selected: number;
  total: number;
  hidleColor?: "light" | "dark";
}
const NavigatorIndicators: React.FC<NavigatorIndicatorsProps> = ({
  selected,
  total,
  hidleColor,
}) => {
  const hidCol = hidleColor === "light" ? "bg-white" : "bg-gray-300";
  const Nav = Array.from({ length: total }, (_, i) => (
    <Dots
      key={i}
      selected={selected === i}
      style={tw`mx-1`}
      hidleColor={hidCol}
    />
  ));
  return (
    <View style={tw`flex flex-row  w-full justify-center items-center mt-5`}>
      {Nav}
    </View>
  );
};

export default NavigatorIndicators;
