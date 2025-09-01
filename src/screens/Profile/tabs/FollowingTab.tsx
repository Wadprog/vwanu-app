import React from 'react'
import { View, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import ProfAvatar from 'components/ProfAvatar'
import { useFetchProfilesQuery } from 'store/profiles'
import { TabContentProps } from '../types'

/**
 * Following Tab Component
 * Displays list of users that the current profile is following
 */
const FollowingTab: React.FC<TabContentProps> = ({ targetUserId }) => {
  // For now, using the same profiles query - in a real app, this would be a specific "following" endpoint
  const { data: following = [] } = useFetchProfilesQuery()

  const renderFollowingItem = ({ item }: { item: any }) => (
    <View
      style={tw`flex-row items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg mb-2`}
    >
      <View style={tw`flex-row items-center flex-1`}>
        <ProfAvatar
          source={item.profilePicture}
          name={`${item.firstName} ${item.lastName}`}
          size={50}
        />
        <View style={tw`ml-3 flex-1`}>
          <Text style={tw`font-semibold`}>
            {item.firstName} {item.lastName}
          </Text>
          {item.bio && (
            <Text
              style={tw`text-gray-600 dark:text-gray-400 text-sm mt-1`}
              numberOfLines={1}
            >
              {item.bio}
            </Text>
          )}
          {item.location && (
            <Text style={tw`text-gray-500 dark:text-gray-500 text-xs mt-1`}>
              📍 {item.location}
            </Text>
          )}
        </View>
      </View>
      <Button
        size="small"
        appearance="outline"
        status="primary"
        onPress={() => {
          // TODO: Implement unfollow functionality
          console.log('Unfollow user:', item.id)
        }}
      >
        Following
      </Button>
    </View>
  )

  return (
    <View style={tw`flex-1`}>
      {following.length > 0 ? (
        <FlatList
          data={following}
          renderItem={renderFollowingItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={tw`h-1`} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        />
      ) : (
        <View style={tw`flex-1 justify-center items-center p-8`}>
          <Ionicons name="person-add-outline" size={64} color="#9CA3AF" />
          <Text style={tw`text-gray-500 mt-4 text-center`}>
            Not following anyone yet
          </Text>
          <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
            Start following people to see them here
          </Text>
        </View>
      )}
    </View>
  )
}

export default FollowingTab
