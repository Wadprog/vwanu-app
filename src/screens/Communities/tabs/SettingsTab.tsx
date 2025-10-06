import React from 'react'
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import tw from 'lib/tailwind'
import Text from 'components/Text'

interface SettingsTabProps {
  communityId: string
}

const SettingsTab: React.FC<SettingsTabProps> = ({ communityId }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [postsEnabled, setPostsEnabled] = React.useState(true)

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
  }: {
    icon: string
    title: string
    subtitle?: string
    onPress?: () => void
    rightElement?: React.ReactNode
  }) => (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 bg-white border-b border-gray-100`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View
        style={tw`w-10 h-10 bg-gray-100 rounded-full items-center justify-center`}
      >
        <Ionicons name={icon as any} size={20} color="#6B7280" />
      </View>
      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`font-semibold text-base`}>{title}</Text>
        {subtitle && (
          <Text style={tw`text-gray-600 text-sm mt-0.5`}>{subtitle}</Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  )

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      {/* Community Settings */}
      <View style={tw`mt-4`}>
        <Text
          style={tw`px-4 py-2 text-xs font-semibold text-gray-500 uppercase`}
        >
          Community Settings
        </Text>
        <SettingItem
          icon="information-circle-outline"
          title="Community Info"
          subtitle="Edit name, description, and cover photo"
          onPress={() => console.log('Edit info')}
        />
        <SettingItem
          icon="people-outline"
          title="Privacy"
          subtitle="Public community"
          onPress={() => console.log('Privacy settings')}
        />
        <SettingItem
          icon="shield-checkmark-outline"
          title="Member Approval"
          subtitle="Automatically approve members"
          onPress={() => console.log('Approval settings')}
        />
      </View>

      {/* Notifications */}
      <View style={tw`mt-6`}>
        <Text
          style={tw`px-4 py-2 text-xs font-semibold text-gray-500 uppercase`}
        >
          Notifications
        </Text>
        <SettingItem
          icon="notifications-outline"
          title="Push Notifications"
          subtitle="Receive notifications for new posts"
          rightElement={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          }
        />
        <SettingItem
          icon="chatbubble-outline"
          title="Post Updates"
          subtitle="Get notified about new posts"
          rightElement={
            <Switch value={postsEnabled} onValueChange={setPostsEnabled} />
          }
        />
      </View>

      {/* Moderation */}
      <View style={tw`mt-6`}>
        <Text
          style={tw`px-4 py-2 text-xs font-semibold text-gray-500 uppercase`}
        >
          Moderation
        </Text>
        <SettingItem
          icon="flag-outline"
          title="Reported Content"
          subtitle="View and manage reports"
          onPress={() => console.log('Reported content')}
        />
        <SettingItem
          icon="ban-outline"
          title="Blocked Users"
          subtitle="Manage blocked members"
          onPress={() => console.log('Blocked users')}
        />
      </View>

      {/* Danger Zone */}
      <View style={tw`mt-6 mb-8`}>
        <Text
          style={tw`px-4 py-2 text-xs font-semibold text-gray-500 uppercase`}
        >
          Danger Zone
        </Text>
        <TouchableOpacity
          style={tw`flex-row items-center p-4 bg-white border-b border-gray-100`}
        >
          <View
            style={tw`w-10 h-10 bg-red-100 rounded-full items-center justify-center`}
          >
            <Ionicons name="exit-outline" size={20} color="#EF4444" />
          </View>
          <View style={tw`flex-1 ml-3`}>
            <Text style={tw`font-semibold text-base text-red-600`}>
              Leave Community
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SettingsTab
