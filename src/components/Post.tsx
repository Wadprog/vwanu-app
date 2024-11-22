import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import Text from "./Text";
import tw from "../lib/tailwind";
import ImageGrid from "./ImageGrid";
import Kore from "../assets/svg/Kore";
import CommentForm from "./CommentFrom";
import AvatarGroup from "./AvatarGroups";
import useToggle from "../hooks/useToggle";
import { abbreviateNumber } from "../lib/numberFormat";

import { PostProps } from "../../types";

const { height } = Dimensions.get("screen");
interface Props extends PostProps {
  showViewComment?: boolean;
}
const Post: React.FC<Props> = ({ showViewComment = true, ...props }) => {
  const navigation = useNavigation();
  const [commenting, toggleCommenting] = useToggle(false);
  return (
    <View style={tw`static`}>
      <View style={tw`flex flex-row items-center`}>
        {props?.user?.profilePicture && (
          <Avatar.Image
            source={{
              uri: props?.user?.profilePicture,
            }}
            size={50}
          />
        )}

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
        <ImageGrid
          medias={props.medias || []}
          style={tw`mb-2`}
          onImageTouch={(id) => {
            const index = props.medias.findIndex(
              (media) => media.id === id.toString()
            );
            //@ts-ignore
            navigation.navigate("Gallery", { ...props, initialSlide: index });
          }}
        />
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

          {showViewComment && (
            <TouchableOpacity
              onPress={() => {
                //@ts-ignore
                navigation.navigate("Comment", {
                  ...props,
                  showViewComment: false,
                });
              }}
            >
              <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-primary font-thin text-sm`}>
                  View all{" "}
                </Text>
                <Text style={tw`text-primary text-sm`}>
                  {abbreviateNumber(props.comments)}
                </Text>

                <Text style={tw`text-primary font-thin text-sm`}>
                  {" "}
                  comments
                </Text>
              </View>
            </TouchableOpacity>
          )}
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
            <TouchableOpacity onPress={toggleCommenting}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {commenting && (
        <View
          style={tw`bg-red-500 bg-opacity-50 absolute top-0 left-0 h-[${height}px]`}
        >
          <CommentForm postId={props.id} />
        </View>
      )}
    </View>
  );
};

export default Post;
