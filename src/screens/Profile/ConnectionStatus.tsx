import React from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import { useTheme } from '../../hooks/useTheme'

export enum ConnectionState {
  FRIENDS = 'friends',
  REQUEST_SENT = 'request_sent',
  REQUEST_RECEIVED = 'request_received',
  NOT_CONNECTED = 'not_connected',
  SELF = 'self',
}

interface ConnectionStatusProps {
  targetUserId: string
  currentUserId: string
  connectionState: ConnectionState
  onSendRequest?: () => void
  onAcceptRequest?: () => void
  onDeclineRequest?: () => void
  onCancelRequest?: () => void
  onStartChat?: () => void
  onUnfriend?: () => void
}

/**
 * ConnectionStatus Component
 * Displays the connection status between current user and profile being viewed
 * Shows appropriate actions based on friendship state
 */
const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  targetUserId,
  currentUserId,
  connectionState,
  onSendRequest,
  onAcceptRequest,
  onDeclineRequest,
  onCancelRequest,
  onStartChat,
  onUnfriend,
}) => {
  const { isDarkMode } = useTheme()

  // Don't show anything if viewing own profile
  if (
    connectionState === ConnectionState.SELF ||
    targetUserId === currentUserId
  ) {
    return null
  }

  const handleChatPress = () => {
    if (onStartChat) {
      onStartChat()
    } else {
      // TODO: Navigate to chat screen
      console.log('Navigate to chat with user:', targetUserId)
    }
  }

  const handleSendRequest = () => {
    if (onSendRequest) {
      onSendRequest()
    } else {
      // TODO: Send friend request API call
      console.log('Send friend request to:', targetUserId)
    }
  }

  const handleAcceptRequest = () => {
    if (onAcceptRequest) {
      onAcceptRequest()
    } else {
      // TODO: Accept friend request API call
      console.log('Accept friend request from:', targetUserId)
    }
  }

  const handleDeclineRequest = () => {
    Alert.alert(
      'Decline Friend Request',
      'Are you sure you want to decline this friend request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            if (onDeclineRequest) {
              onDeclineRequest()
            } else {
              // TODO: Decline friend request API call
              console.log('Decline friend request from:', targetUserId)
            }
          },
        },
      ]
    )
  }

  const handleCancelRequest = () => {
    Alert.alert(
      'Cancel Friend Request',
      'Are you sure you want to cancel this friend request?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Cancel Request',
          style: 'destructive',
          onPress: () => {
            if (onCancelRequest) {
              onCancelRequest()
            } else {
              // TODO: Cancel friend request API call
              console.log('Cancel friend request to:', targetUserId)
            }
          },
        },
      ]
    )
  }

  const handleUnfriend = () => {
    Alert.alert(
      'Unfriend User',
      'Are you sure you want to remove this person from your friends?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unfriend',
          style: 'destructive',
          onPress: () => {
            if (onUnfriend) {
              onUnfriend()
            } else {
              // TODO: Unfriend API call
              console.log('Unfriend user:', targetUserId)
            }
          },
        },
      ]
    )
  }

  const renderConnectionContent = () => {
    switch (connectionState) {
      case ConnectionState.FRIENDS:
        return (
          <View style={tw`flex-row items-center`}>
            {/* Chat Button */}
            <TouchableOpacity
              onPress={handleChatPress}
              style={tw`p-2 mr-2 rounded-full ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}
              accessibilityLabel="Start chat"
            >
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={isDarkMode ? '#60A5FA' : '#2563EB'}
              />
            </TouchableOpacity>

            {/* Friends Menu */}
            <TouchableOpacity
              onPress={handleUnfriend}
              style={tw`p-2 rounded-full ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}
              accessibilityLabel="Friends options"
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={isDarkMode ? '#34D399' : '#059669'}
              />
            </TouchableOpacity>
          </View>
        )

      case ConnectionState.REQUEST_RECEIVED:
        return (
          <View style={tw`flex-row items-center`}>
            {/* Accept Button */}
            <TouchableOpacity
              onPress={handleAcceptRequest}
              style={tw`p-2 mr-2 rounded-full ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}
              accessibilityLabel="Accept friend request"
            >
              <Ionicons
                name="checkmark"
                size={20}
                color={isDarkMode ? '#34D399' : '#059669'}
              />
            </TouchableOpacity>

            {/* Decline Button */}
            <TouchableOpacity
              onPress={handleDeclineRequest}
              style={tw`p-2 rounded-full ${
                isDarkMode ? 'bg-red-900' : 'bg-red-100'
              }`}
              accessibilityLabel="Decline friend request"
            >
              <Ionicons
                name="close"
                size={20}
                color={isDarkMode ? '#F87171' : '#DC2626'}
              />
            </TouchableOpacity>

            {/* Badge indicator */}
            <View
              style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full`}
            />
          </View>
        )

      case ConnectionState.REQUEST_SENT:
        return (
          <TouchableOpacity
            onPress={handleCancelRequest}
            style={tw`p-2 rounded-full ${
              isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'
            }`}
            accessibilityLabel="Friend request pending"
          >
            <Ionicons
              name="hourglass-outline"
              size={20}
              color={isDarkMode ? '#FBBF24' : '#D97706'}
            />
          </TouchableOpacity>
        )

      case ConnectionState.NOT_CONNECTED:
        return (
          <TouchableOpacity
            onPress={handleSendRequest}
            style={tw`p-2 rounded-full ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}
            accessibilityLabel="Send friend request"
          >
            <Ionicons
              name="person-add-outline"
              size={20}
              color={isDarkMode ? '#60A5FA' : '#2563EB'}
            />
          </TouchableOpacity>
        )

      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (connectionState) {
      case ConnectionState.FRIENDS:
        return 'Friends'
      case ConnectionState.REQUEST_RECEIVED:
        return 'Friend request received'
      case ConnectionState.REQUEST_SENT:
        return 'Friend request sent'
      case ConnectionState.NOT_CONNECTED:
        return 'Not connected'
      default:
        return ''
    }
  }

  return (
    <View style={tw`items-center`}>
      {renderConnectionContent()}
      {/* Status Text (optional, can be hidden if you prefer icon-only) */}
      <Text
        style={tw`text-xs mt-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {getStatusText()}
      </Text>
    </View>
  )
}

export default ConnectionStatus
