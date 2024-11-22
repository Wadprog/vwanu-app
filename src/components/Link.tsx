import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "./Text";
import tw from "../lib/tailwind";

interface LinkProps {
  text: string;
  to: string;
  style?: object;
}

const Link: React.FC<LinkProps> = ({ text, to, style = {} }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate(to);
      }}
    >
      <Text category="c1" appearance="hint" style={[tw`text-blue-500`, style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
