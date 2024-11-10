import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import Text from "./Text";
import tw from "../lib/tailwind";

const Link = ({ text, to, style = {} }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(to);
      }}
    >
      <Text category="c1" appearance="hint" style={[tw`text-blue-500`, style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Link;
