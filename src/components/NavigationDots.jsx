import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import tw from "../lib/tailwind";

const Dots = ({ selected, style, ...props }) => (
  <View
    style={[
      tw` rounded-3xl h-[8px] ${
        selected ? "w-[15px] bg-primary " : "w-[8px] bg-gray-500"
      }`,
      style,
    ]}
    {...props}
  />
);
export default function NavigatorIndicators({ selected, total }) {
  const Nav = Array.from({ length: total }, (_, i) => (
    <Dots key={i} selected={selected === i} style={tw`mx-2`} />
  ));
  return (
    <View
      style={tw`flex flex-row  w-full bg--300 justify-center items-center mt-5`}
    >
      {Nav}
    </View>
  );
}

NavigatorIndicators.propTypes = {
  selected: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

Dots.propTypes = {
  selected: PropTypes.bool.isRequired,
  style: PropTypes.object,
};
