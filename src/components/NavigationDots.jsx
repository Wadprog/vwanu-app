import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import tw from "../lib/tailwind";

const Dots = ({ selected, style, hidleColor = "bg-green-500", ...props }) => (
  <View
    style={[
      tw` rounded-3xl h-[10px] ${
        selected ? "w-[15px] bg-primary " : "w-[10px] bg-white"
      }`,
      style,
    ]}
    {...props}
  />
);
export default function NavigatorIndicators({ selected, total, hidleColor }) {
  const Nav = Array.from({ length: total }, (_, i) => (
    <Dots
      key={i}
      selected={selected === i}
      style={tw`mx-1`}
      hidleColor={hidleColor}
    />
  ));
  return (
    <View style={tw`flex flex-row  w-full justify-center items-center mt-5`}>
      {Nav}
    </View>
  );
}

NavigatorIndicators.propTypes = {
  selected: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  hidleColor: PropTypes.string,
};

Dots.propTypes = {
  selected: PropTypes.bool.isRequired,
  style: PropTypes.object,
  hidleColor: PropTypes.string,
};
