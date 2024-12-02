import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

import Text from "./Text";
import tw from "../lib/tailwind";

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}
interface AvatarGroupProps {
  avatars: User[];
  style?: Object;
  max?: number;
  extras?: number;
}

const plusAvatarStyle = tw`bg-gray-500 bg-opacity-90 text-white ml-1 p-1 rounded`;
const AvatarGroup: React.FC<AvatarGroupProps> = (props) => (
  <View style={[tw`flex flex-row items-center`]}>
    <View style={[tw`flex flex-row items-center`, props.style || {}]}>
      {props.avatars.map((avatar, index) => {
        if (props.max !== undefined && index > props.max - 1) return null;
        return (
          <Avatar.Image
            key={index}
            source={{
              uri: avatar.profilePicture,
            }}
            size={30}
            style={tw`border border-primary ${index && "-ml-2"}`}
          />
        );
      })}
    </View>
    {(props.avatars.length > (props.max || 3) || props.extras) && (
      <>
        {props.extras ? (
          <Text style={plusAvatarStyle}>{`+${props.extras}`}</Text>
        ) : (
          <Text style={plusAvatarStyle}>{`+${
            props.avatars.length - (props.max || 3)
          }`}</Text>
        )}
      </>
    )}
  </View>
);

export default AvatarGroup;
