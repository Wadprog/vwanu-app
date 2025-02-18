import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomTabParms } from '../../types'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import Screen from 'components/screen'
import ProfAvatar from 'components/ProfAvatar'
import { useFetchPostsQuery } from 'store/post'
import { useFetchProfilesQuery, useFetchProfileQuery } from 'store/profiles'
import Post from 'components/Post'
import { RootState } from 'store'
import NoPost from 'components/NoPost'
import routes from 'navigation/routes'

const Separator = () => <View style={tw`m-1`} />

interface ProfileProps {
  profileId?: string
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { userId } = useSelector((state: RootState) => state.auth)
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParms>>()
  const user = props?.profileId
    ? useFetchProfileQuery(props?.profileId).data
    : useFetchProfileQuery(userId!).data
  const { data: posts = [] } = useFetchPostsQuery()
  const { data: followers = [] } = useFetchProfilesQuery()

  return (
    <Screen>
      <View style={tw`p-3`}>
        <Text style={tw`font-semibold text-center mb-3`}>Profile</Text>
        <View style={tw`flex flex-row justify-between items-center`}>
          <ProfAvatar
            source={user?.profilePicture!}
            name={`${user?.firstName} ${user?.lastName}`}
            subtitle={user?.email}
            size={50}
          />
          <>
            {userId === user.id && (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </>
        </View>
        <View style={tw`flex flex-row justify-between mt-3`}>
          {userId === user?.id ? (
            <>
              {user.bio ? (
                <Text style={tw`text-wrap w-[50%]`}>{user.bio}</Text>
              ) : (
                <Text style={tw`text-wrap font-thin w-[50%]`}>
                  Let us know more about you, add a bio!
                </Text>
              )}
            </>
          ) : (
            <>
              {user?.bio ? (
                <Text style={tw`text-wrap font-thin w-[50%]`}>
                  You should tell them to add a bio
                </Text>
              ) : (
                <Text style={tw`text-wrap w-[50%]`}>{user.bio}</Text>
              )}
            </>
          )}

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
            <Text style={tw`font-semibold`}>
              {user?.amountOfFollowing || 0}
            </Text>
            <Text style={tw`font-thin`}>Following</Text>
          </View>
          <View style={tw`w-[1px] bg-gray-900 h-12`} />
          <View style={tw`justify-center items-center`}>
            <Text style={tw`font-semibold`}>
              {user?.amountOfFollowers || 0}
            </Text>
            <Text style={tw`font-thin`}>Followers</Text>
          </View>
        </View>

        <View style={tw`w-full h-[1px] bg-gray-300 `} />
        <View>
          <>
            {userId === user?.id ? (
              <View>
                {user?.amountOfFollowers > 0 ? (
                  <Text style={tw`font-semibold mt-3 mb-2`}>followers</Text>
                ) : (
                  <View
                    style={tw`flex flex-row justify-center items-center my-2`}
                  >
                    <Text style={tw`font-thin `}>Make connections</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(routes.FOLLOWERS)}
                    >
                      <Text style={tw`font-semibold text-blue-500 ml-1`}>
                        here
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : null}
          </>
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
        <FlatList
          ListHeaderComponent={
            <View>
              <Text style={tw`font-semibold mt-3 mb-2`}>Posts</Text>
            </View>
          }
          ListEmptyComponent={() => (
            <View style={tw`mt-`}>
              <NoPost
                title={
                  userId === user.id
                    ? 'No posts Yet'
                    : 'They have not created a post yet '
                }
                subtitle={
                  userId === user.id
                    ? 'Hurry be the first to create a post'
                    : 'Encourage them to post on vwanu'
                }
                actionBtn={{
                  label: 'Create Post',
                  onPress: () => {
                    navigation.navigate(routes.TIMELINE)
                  },
                }}
              />
            </View>
          )}
          data={posts}
          renderItem={(post) => <Post {...post.item} />}
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  )
}

export default Profile
