import React from "react";
import { View } from "react-native";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";

import tw from "lib/tailwind";
import Text from "components/Text";
import ProfAvatar from "components/ProfAvatar";
import AvatarGroup from "components/AvatarGroups";
import { Conversation } from "../../../../types";

const Conversation: React.FC<Conversation> = (props) => {
  return (
    <View style={tw`flex flex-row items-center justify-between`}>
      {Array.isArray(props.users) ? (
        <View>
          <AvatarGroup
            avatars={props.users}
            style={tw`flex-row items-center`}
          />
          <Text style={tw`font-semibold`}>
            {props.users
              .map((user, index) => {
                return index > 3 ? user.firstName : "";
              })
              .join("& ")}
          </Text>
        </View>
      ) : (
        <ProfAvatar
          source={props.users.profilePicture}
          name={props.users.firstName}
          size={40}
          subtitle={props.lastMessage.content}
        />
      )}
      <View style={tw`flex items-center`}>
        <Text appearance="hint" category="c1">
          {formatDistanceToNowStrict(props.lastMessage.createdAt)}
        </Text>
        <Text style={tw`bg-primary px-1 rounded-full text-white`}>3</Text>
      </View>
    </View>
  );
};

export default Conversation;
