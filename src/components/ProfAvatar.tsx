import { View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

import tw from "lib/tailwind";
import Text from "components/Text";

interface ProfAvatarProps {
  source: string;
  name: string;
  subtitle?: string;
  size: number;
  layout?: "col" | "row";
}

const ProfAvatar: React.FC<ProfAvatarProps> = ({
  layout = "row",
  ...props
}) => {
  return (
    <View style={tw`flex flex-${layout} items-center`}>
      <Avatar.Image size={props.size} source={{ uri: props.source }} />
      <View style={tw`ml-2 flex justify-center`}>
        <Text style={tw`font-semibold`}>{props.name}</Text>
        {props.subtitle ? (
          <Text style={tw`font-thin`}>{props?.subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default ProfAvatar;
