import { View, ImageBackground, FlatList } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

import tw from "lib/tailwind";
import Text from "components/Text";
import { CommunityInterface } from "../../../types";
import { useFetchCommunityByIdQuery } from "store/community";
import PostInput from "components/PostInput";
import { useFetchPostsQuery } from "store/post";
import Post from "components/Post";
import Screen from "components/screen";

const CommunityDetails: React.FC<CommunityInterface> = () => {
  const routes = useRoute();
  const posts = useFetchPostsQuery();
  //@ts-ignore
  const community = useFetchCommunityByIdQuery(routes?.params?.id, {
    // @ts-ignore
    skip: !routes?.params?.id === null,
  });

  return (
    <View style={tw`flex-1`}>
      <View style={tw`h-1/2 rounded-b-3xl overflow-hidden`}>
        <ImageBackground
          style={tw`px-5 bg-grenn-400   h-full flex `}
          source={{ uri: community.data?.backgroundImage }}
        >
          <View style={tw`flex-1 justify-end pb-10`}>
            <Text category="h1" style={{ color: "white" }}>
              {community.data?.name}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={tw`bg-white px-4`}>
        <View style={tw`flex flex-row justify-center items-center my-3 gap-8`}>
          <View style={tw`justify-center items-center`}>
            <Text style={tw`font-semibold`}>200</Text>
            <Text style={tw`font-thin`}>Members</Text>
          </View>
          <View style={tw`w-[1px] bg-gray-900 h-12`} />
          <View style={tw`justify-center items-center`}>
            <Text style={tw`font-semibold`}>15K</Text>
            <Text style={tw`font-thin`}>Posts</Text>
          </View>
        </View>
        <View style={tw`mt-3`}>
          <PostInput />
        </View>

        <View style={tw`mt-3`}>
          <FlatList
            data={posts.data || []}
            renderItem={(post) => <Post {...post.item} />}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const Separator = () => <View style={tw`m-1`} />;
export default CommunityDetails;
