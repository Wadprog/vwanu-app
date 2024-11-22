import { View, FlatList } from "react-native";

import Text from "../../components/Text";
import Post from "../../components/Post";
import PostInput from "../../components/PostInput";
import Community from "../../components/community";

import Banner from "../../components/Appbanner";
import tw from "../../lib/tailwind";
import Link from "../../components/Link";
import routes from "../../navigation/routes";
import Screen from "../../components/screen";
import { useFetchPostsQuery } from "../../store/post";
import { useFetchCommunityQuery } from "../../store/community";

const Separator = () => <View style={tw`m-1`} />;

const Timeline: React.FC = () => {
  const { data: posts = [] } = useFetchPostsQuery();
  const { data: communities = [] } = useFetchCommunityQuery();
  return (
    <Screen>
      <View style={tw`bg-white p-3 relative`}>
        <Banner />
        <View style={tw`mt-3`}>
          <PostInput />
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-2 mb-1`}>
          <Text category="h5" style={tw`text-gray-500 font-thin`}>
            Community
          </Text>
          <Link text="see All" to={routes.HOME} />
        </View>
        <View style={tw`mb-3`}>
          <FlatList
            data={communities}
            renderItem={({ item }) => <Community {...item} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <FlatList
          data={posts}
          renderItem={(post) => <Post {...post.item} />}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
};

export default Timeline;

// const styles = StyleSheet.create({})
