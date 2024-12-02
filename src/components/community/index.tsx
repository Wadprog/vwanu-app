import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "../Text";
import tw from "lib/tailwind";
import Button from "../Button";
import { CommunityInterface } from "../../../types";
import AvatarGroup from "components/AvatarGroups";
import routes from "navigation/routes";

const Community: React.FC<CommunityInterface> = (props) => {
  const navigation = useNavigation();
  const height =
    props.size === "large"
      ? 260
      : props.size === "medium"
      ? 176
      : props.size === "small"
      ? 65
      : 260;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.COMMUNITY_DETAILS, { id: props.id })
      }
      style={[
        tw`rounded-lg overflow-hidden min-h-[130px] h-[${height}px] `,
        props.style || null,
      ]}
    >
      <ImageBackground
        source={{ uri: props.backgroundImage }}
        resizeMode="cover"
        fadeDuration={300}
      >
        <View style={tw`h-full px-3 py-5 justify-end`}>
          <View>
            <View style={tw`flex flex-row overflow-hidden`}>
              {props.interests.map((item) => (
                <Label key={item.id} name={item.name} />
              ))}
            </View>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View>
                <Text category="h6" style={tw`text-wrap w-[95px] text-white`}>
                  {props.name}
                </Text>
                <AvatarGroup avatars={props.members || []} extras={20} />
              </View>

              {props.size === "large" && (
                <View style={tw`flex-1 items-end mx-1`}>
                  <Label name="Join" />
                </View>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Label: React.FC<{
  name: string;
  onPress?: () => void;
}> = ({ name, onPress }) => {
  return (
    <>
      {onPress ? (
        <Button title={name} onPress={onPress} style={tw`mx-1`} />
      ) : (
        <View style={tw`bg-white bg-opacity-50 mx-1 p-1 rounded`}>
          <Text style={tw`mx-1`}>{name}</Text>
        </View>
      )}
    </>
  );
};
export default Community;
