import { View, ImageBackground } from "react-native";
import React from "react";

import Text from "../Text";
import tw from "../../lib/tailwind";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}
export interface CommunityInterface {
  name: string;
  bacgroundImage: string;
  createdAt: string;
  members: User[];
  id: number;
}
const Community: React.FC<CommunityInterface> = (props) => {
  return (
    <View style={tw`rounded-2xl overflow-hidden bg-red-500 w-[150px]`}>
      <ImageBackground
        source={{ uri: props.bacgroundImage }}
        style={tw`w-full h-[100px] rounded-lg`}
      >
        <View
          style={tw`bg-black bg-opacity-50 h-full flex justify-between p-2 items-center`}
        >
          <View></View>
          <View style={tw`flex flex-row`}>
            <Text category="p1" style={tw`text-[13px] font-bold text-wrap`}>
              {props.name || "Community"}
            </Text>
            <View>
              <Text>Join</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Community;
