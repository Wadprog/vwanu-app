import { View, FlatList } from 'react-native'

import Text from '../../components/Text'
import Post from '../../components/Post'
import PostInput from '../../components/PostInput'
import Community from '../../components/community'

import Banner from '../../components/Appbanner'
import tw from '../../lib/tailwind'
import Link from '../../components/Link'
import routes from '../../navigation/routes'
import Screen from '../../components/screen'
import { useFetchPostsQuery } from '../../store/post'
import { useFetchCommunityQuery } from '../../store/community'
import TimelineSkeletone from './TimelineSkeletone'

const Separator = () => <View style={tw`m-1`} />

const Timeline: React.FC = () => {
  const posts = useFetchPostsQuery()
  const {
    data: communities = [],
    isFetching,
    refetch,
  } = useFetchCommunityQuery()
  console.log(posts.data)
  // posts.refetch()
  console.log(posts.error)

  if (posts.data === undefined)
    return (
      <View>
        <Text> No data</Text>
      </View>
    )

  return (
    <Screen
      loading={posts.isLoading || posts.isFetching}
      loadinScreen={<TimelineSkeletone />}
      error={
        posts.error
          ? {
              message: posts.error as string,
              onRetry: () => {
                posts.refetch()
              },
            }
          : null
      }
    >
      <View style={tw`bg-white p-3 relative`}>
        {/* <Banner /> */}
        <View style={tw`mt-3`}>
          <PostInput />
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-2 mb-1`}>
          <Text category="h5" style={tw`text-gray-500 font-thin`}>
            Community
          </Text>
          <Link text="see All" to={routes.HOME} />
        </View>
        {/* <View style={tw`mb-3`}>
          <FlatList
            data={communities}
            renderItem={({ item }) => <Community {...item} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
        <View>
          <FlatList
            ListEmptyComponent={() => (
              <View>
                <Text>Empty list</Text>
              </View>
            )}
            refreshing={posts.isFetching}
            onRefresh={() => posts.refetch()}
            data={posts.data.data}
            renderItem={(post) => <Post {...post.item} />}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Screen>
  )
}

// createe a class the represent a car and it has a method that can drive the car

export default Timeline

// const styles = StyleSheet.create({})
