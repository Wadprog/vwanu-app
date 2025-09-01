/**
 * Notification Settings Screen
 * Manage push notifications, email alerts, and notification preferences
 */
import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Toggle } from '@ui-kitten/components'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'

interface NotificationSetting {
  id: string
  title: string
  subtitle: string
  value: boolean
  onToggle: (value: boolean) => void
}

const NotificationSettings: React.FC = () => {
  const navigation = useNavigation()
  const { isDarkMode } = useTheme()

  // Mock notification settings - in real app, these would come from API/storage
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [postLikes, setPostLikes] = useState(true)
  const [postComments, setPostComments] = useState(true)
  const [friendRequests, setFriendRequests] = useState(true)
  const [newFollowers, setNewFollowers] = useState(false)
  const [messages, setMessages] = useState(true)
  const [communityUpdates, setCommunityUpdates] = useState(false)

  const notificationSettings: NotificationSetting[] = [
    {
      id: 'push',
      title: 'Push Notifications',
      subtitle: 'Receive notifications on your device',
      value: pushNotifications,
      onToggle: setPushNotifications,
    },
    {
      id: 'email',
      title: 'Email Notifications',
      subtitle: 'Receive notifications via email',
      value: emailNotifications,
      onToggle: setEmailNotifications,
    },
    {
      id: 'post_likes',
      title: 'Post Likes',
      subtitle: 'When someone likes your posts',
      value: postLikes,
      onToggle: setPostLikes,
    },
    {
      id: 'post_comments',
      title: 'Post Comments',
      subtitle: 'When someone comments on your posts',
      value: postComments,
      onToggle: setPostComments,
    },
    {
      id: 'friend_requests',
      title: 'Friend Requests',
      subtitle: 'When someone sends you a friend request',
      value: friendRequests,
      onToggle: setFriendRequests,
    },
    {
      id: 'new_followers',
      title: 'New Followers',
      subtitle: 'When someone follows you',
      value: newFollowers,
      onToggle: setNewFollowers,
    },
    {
      id: 'messages',
      title: 'Messages',
      subtitle: 'When you receive new messages',
      value: messages,
      onToggle: setMessages,
    },
    {
      id: 'community_updates',
      title: 'Community Updates',
      subtitle: 'Updates from communities you joined',
      value: communityUpdates,
      onToggle: setCommunityUpdates,
    },
  ]

  const renderNotificationSetting = (setting: NotificationSetting) => (
    <View
      key={setting.id}
      style={tw`flex-row items-center justify-between p-4  border-b `}
    >
      <View style={tw`flex-1 mr-3`}>
        <Text style={tw`font-semibold`}>{setting.title}</Text>
        <Text
          style={tw`text-sm mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {setting.subtitle}
        </Text>
      </View>

      <Toggle checked={setting.value} onChange={setting.onToggle} />
    </View>
  )

  const handleSaveSettings = () => {
    // TODO: Save notification settings to API/storage
    console.log('Saving notification settings...')
    // Show success message or navigate back
  }

  return (
    <Screen>
      <View style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center p-4  border-b`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`mr-3`}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold`}>Notifications</Text>
        </View>

        {/* Settings List */}
        <ScrollView style={tw`flex-1`}>
          {/* General Section */}
          <View style={tw`mt-4`}>
            <Text
              style={tw`px-4 pb-2 font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              GENERAL
            </Text>
            {notificationSettings.slice(0, 2).map(renderNotificationSetting)}
          </View>

          {/* Activity Section */}
          <View style={tw`mt-6`}>
            <Text
              style={tw`px-4 pb-2 font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              ACTIVITY
            </Text>
            {notificationSettings.slice(2, 6).map(renderNotificationSetting)}
          </View>

          {/* Communication Section */}
          <View style={tw`mt-6`}>
            <Text
              style={tw`px-4 pb-2 font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              COMMUNICATION
            </Text>
            {notificationSettings.slice(6).map(renderNotificationSetting)}
          </View>

          {/* Info Section */}
          <View
            style={tw`mt-6 p-4 mx-4 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
            } rounded-lg`}
          >
            <View style={tw`flex-row items-start`}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={isDarkMode ? '#60A5FA' : '#2563EB'}
                style={tw`mr-2 mt-0.5`}
              />
              <View style={tw`flex-1`}>
                <Text
                  style={tw`text-sm ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}
                >
                  <Text style={tw`font-semibold`}>Note:</Text> Some
                  notifications may still be received even when disabled, such
                  as security alerts and account-related updates.
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`h-20`} />
        </ScrollView>
      </View>
    </Screen>
  )
}

export default NotificationSettings
