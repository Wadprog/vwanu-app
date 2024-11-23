import React from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";

import tw from "lib/tailwind";
import Text from "components/Text";
import Screen from "components/screen";
import { getCurrentUser } from "store/auth";
import ProfAvatar from "components/ProfAvatar";
import Vertical from "assets/svg/Vertical";
import { useFetchPostsQuery } from "store/post";
import { useFetchProfilesQuery, useFetchProfileQuery } from "store/profiles";
import Post from "components/Post";

const Separator = () => <View style={tw`m-1`} />;

interface ProfileProps {
  profileId?: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const user = props?.profileId
    ? useFetchProfileQuery(props?.profileId).data
    : useSelector(getCurrentUser).user;
  const { data: posts = [] } = useFetchPostsQuery();
  const { data: followers = [] } = useFetchProfilesQuery();

  return (
    <Screen>
      <View style={tw`p-3`}>
        <Text style={tw`font-semibold text-center mb-3`}>Profile</Text>
        <View style={tw`flex flex-row justify-between items-center`}>
          <ProfAvatar
            source={user?.profilePicture}
            name={user?.firstName + " " + user?.lastName}
            subtitle={user?.email}
            size={50}
          />
          <Vertical />
        </View>
        <View style={tw`flex flex-row justify-between mt-3`}>
          <Text style={tw`text-wrap w-[50%]`}>
            I am a positive Person. I love to travel and eat and always
            available for a chat
          </Text>

          <View style={tw`flex flex-row justify-between items-center `}>
            <Button
              appearance="outline"
              accessoryLeft={() => (
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="black"
                />
              )}
              style={tw`rounded-full w-15`}
            />
            <Button style={tw` ml-1 rounded-full`}>
              <Text style={tw`text-white`}>Follow</Text>
            </Button>
          </View>
        </View>
        <View style={tw`flex flex-row justify-center items-center my-3 gap-8`}>
          <View style={tw`justify-center items-center`}>
            <Text style={tw`font-semibold`}>200</Text>
            <Text style={tw`font-thin`}>Posts</Text>
          </View>
          <View style={tw`w-[1px] bg-gray-900 h-12`} />
          <View style={tw`justify-center items-center`}>
            <Text style={tw`font-semibold`}>200</Text>
            <Text style={tw`font-thin`}>Following</Text>
          </View>
          <View style={tw`w-[1px] bg-gray-900 h-12`} />
          <View style={tw`justify-center items-center`}>
            <Text style={tw`font-semibold`}>200</Text>
            <Text style={tw`font-thin`}>Followers</Text>
          </View>
        </View>

        <View style={tw`w-full h-[1px] bg-gray-300 `} />
        <View>
          <Text style={tw`font-semibold mt-3 mb-2`}>Followers</Text>
          <FlatList
            data={followers}
            renderItem={({ item }) => (
              <ProfAvatar
                name={item.firstName}
                size={40}
                source={item.profilePicture}
                layout="col"
              />
            )}
            horizontal
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={tw`w-full h-[1px] bg-gray-300 `} />
        <Text style={tw`font-semibold mt-3 mb-2`}>Posts</Text>
        <FlatList
          data={posts}
          renderItem={(post) => <Post {...post.item} />}
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
};

export default Profile;
