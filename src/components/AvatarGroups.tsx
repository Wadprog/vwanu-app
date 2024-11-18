import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

import tw from "../lib/tailwind";

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}
interface AvatarGroupProps {
  avatars: User[];
  style?: Object;
}
const AvatarGroup: React.FC<AvatarGroupProps> = (props) => (
  <View style={[tw`flex flex-row items-center`, props.style || {}]}>
    {props.avatars.map((avatar, index) => (
      <Avatar.Image
        key={index}
        source={{
          uri: avatar.profilePicture,
        }}
        size={30}
        style={tw`border border-primary ${index && "-ml-2"}`}
      />
    ))}
  </View>
);

export default AvatarGroup;
