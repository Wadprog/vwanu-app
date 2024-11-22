import { View, ImageBackground, FlatList } from "react-native";
import React from "react";

import Text from "../Text";
import tw from "../../lib/tailwind";
import Button from "../Button";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Interest {
  id: number;
  name: string;
}
export interface CommunityInterface {
  id: number;
  name: string;
  createdAt: string;
  backgroundImage: string;
  interests: Interest[];
}

const Community: React.FC<CommunityInterface> = (props) => {
  return (
    <View style={tw`rounded-2xl overflow-hidden w-[150px]`}>
      <ImageBackground
        source={{ uri: props.backgroundImage }}
        style={tw`w-full h-[100px] rounded-lg`}
      >
        <View
          style={tw`bg-black bg-opacity-50 h-full flex justify-between py-2 px-1`}
        >
          <View style={tw`flex flex-row overflow-hidden`}>
            {props.interests.map((item) => (
              <View style={tw`bg-white bg-opacity-50 mx-1 p-1 rounded`}>
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text
              category="p1"
              style={tw`text-[16px] font-bold text-wrap w-[95px]`}
            >
              {props.name}
            </Text>
            <View
              style={tw`bg-white bg-opacity-40 p-1 rounded flex-1 justify-center items-center mx-1`}
            >
              <Text style={tw`text-primary font-bold`}>Join</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Community;
