import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import { TabContentProps } from '../types'

/**
 * Communities Tab Component
 * Displays list of communities the user has joined
 */
const CommunitiesTab: React.FC<TabContentProps> = ({ targetUserId }) => {
  // Mock data - in a real app, this would come from an API
  const mockCommunities = [
    {
      id: 1,
      name: 'Tech Enthusiasts',
      description: 'A community for technology lovers and innovators',
      memberCount: 1250,
      image: null,
      isJoined: true,
    },
    {
      id: 2,
      name: 'Photography Club',
      description: 'Share your best shots and learn from others',
      memberCount: 890,
      image: null,
      isJoined: true,
    },
    {
      id: 3,
      name: 'Book Readers',
      description: 'Discuss your favorite books and discover new ones',
      memberCount: 2100,
      image: null,
      isJoined: true,
    },
  ]

  const renderCommunityItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`bg-white dark:bg-gray-800 rounded-lg p-4 mb-3`}
      onPress={() => {
        // TODO: Navigate to community details
        console.log('Navigate to community:', item.id)
      }}
    >
      <View style={tw`flex-row items-start`}>
        {/* Community Avatar/Icon */}
        <View
          style={tw`w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-3`}
        >
          <Ionicons name="globe-outline" size={24} color="#3B82F6" />
        </View>

        {/* Community Info */}
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <Text style={tw`font-semibold text-lg`}>{item.name}</Text>
            {item.isJoined && (
              <View
                style={tw`bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full`}
              >
                <Text style={tw`text-green-800 dark:text-green-200 text-xs`}>
                  Joined
                </Text>
              </View>
            )}
          </View>

          <Text style={tw`text-gray-600 dark:text-gray-400 text-sm mb-2`}>
            {item.description}
          </Text>

          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-gray-500 dark:text-gray-500 text-xs`}>
              {item.memberCount.toLocaleString()} members
            </Text>

            <Button
              size="small"
              appearance={item.isJoined ? 'outline' : 'filled'}
              status="primary"
              onPress={() => {
                // TODO: Implement join/leave functionality
                console.log('Toggle community membership:', item.id)
              }}
            >
              {item.isJoined ? 'Leave' : 'Join'}
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={tw`flex-1`}>
      {mockCommunities.length > 0 ? (
        <FlatList
          data={mockCommunities}
          renderItem={renderCommunityItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        />
      ) : (
        <View style={tw`flex-1 justify-center items-center p-8`}>
          <Ionicons name="globe-outline" size={64} color="#9CA3AF" />
          <Text style={tw`text-gray-500 mt-4 text-center`}>
            No communities joined yet
          </Text>
          <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
            Discover and join communities that interest you
          </Text>
          <Button
            style={tw`mt-4`}
            appearance="outline"
            status="primary"
            onPress={() => {
              // TODO: Navigate to communities discovery
              console.log('Navigate to communities discovery')
            }}
          >
            Explore Communities
          </Button>
        </View>
      )}
    </View>
  )
}

export default CommunitiesTab
