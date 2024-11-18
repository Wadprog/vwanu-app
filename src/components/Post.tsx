import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import Text from "./Text";
import tw from "../lib/tailwind";
import Kore from "../assets/svg/Kore";
import ImageGrid, { Medias } from "./ImageGrid";
import { abbreviateNumber } from "../lib/numberFormat";
import AvatarGroup from "./AvatarGroups";

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface PostProps {
  postText: string;
  medias: Medias[];
  createdAt: string;
  likes: number;
  comments: number;
  likers: User[];
  user: User;
}

const Post: React.FC<PostProps> = (props) => {
  return (
    <View>
      <View style={tw`flex flex-row items-center`}>
        <Avatar.Image
          source={{
            uri: props.user.profilePicture,
          }}
          size={50}
        />

        <View style={tw`ml-2`}>
          <Text style={tw`text-black`}>
            {`${props.user.firstName} ${props.user.lastName}`}
          </Text>
          <Text appearance="hint" style={tw`text-black font-thin`}>
            {formatDistanceToNow(new Date(props.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>

      <Text category="p2" style={tw`text-gray-500 mb-2`}>
        {props.postText}
      </Text>

      {props.medias.length > 0 && (
        <ImageGrid medias={props.medias || []} style={tw`mb-2`} />
      )}

      <AvatarGroup avatars={props.likers || []} style={tw`mt-2`} />

      <View style={tw`flex flex-row items-center justify-between`}>
        <View>
          {props.likers.length ? (
            <View style={tw`flex flex-row items-center `}>
              <Text style={tw`text-black font-thin`}>Liked by</Text>
              <Text style={tw`text-black`}> {props.likers[0].firstName} </Text>
              <Text style={tw`text-black font-thin`}>and</Text>
              <Text style={tw`text-black`}>
                {" "}
                {abbreviateNumber(props.likes)}+{" "}
              </Text>
              <Text style={tw`text-black font-thin`}>others</Text>
            </View>
          ) : (
            <Text style={tw`text-black font-thin`}>Be the first to Kore</Text>
          )}

          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-primary font-thin text-sm`}>View all </Text>
            <Text style={tw`text-primary text-sm`}>
              {abbreviateNumber(props.comments)}
            </Text>
            <Text style={tw`text-primary font-thin text-sm`}> comments</Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`self-end`}>
            <Ionicons name="share-outline" size={24} color="black" />
          </View>
          <View style={tw`mx-2`}>
            <Text
              category="c1"
              appearance="hint"
              style={tw`text-black text-sm font-thin`}
            >
              {abbreviateNumber(props.likes)}
            </Text>

            <Kore />
            {/* <Svg /> */}
          </View>
          <View>
            <Text
              category="c1"
              appearance="hint"
              style={tw`text-black text-sm font-thin`}
            >
              {abbreviateNumber(props.comments)}
            </Text>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="black"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;
