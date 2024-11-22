import React from "react";
import { View, FlatList, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import tw from "../../../lib/tailwind";
import Comment from "./components/Comment";
import Post from "../../../components/Post";
import { FeedStackParams } from "../../../../types";
import { useFetchCommentsQuery } from "../../../store/comment";

type Props = StackScreenProps<FeedStackParams, "Comment">;

const CommentScreen: React.FC<Props> = ({ route }) => {
  const post = route.params;
  const { data: comments = [], isLoading } = useFetchCommentsQuery(
    route.params.id
  );

  console.log("\n\n\n\n ***** \n\n\n");
  console.log({ comments });
  console.log("\n\n\n\n ***** \n\n\n");

  return (
    <ScrollView style={tw`px-2 flex-1 bg-white w-screen`}>
      <Post {...post} />
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment {...item} />}
        style={tw`mt-3`}
      />
    </ScrollView>
  );
};

export default CommentScreen;
