/**
 * ConnectionStatus Demo Component
 * Shows all possible connection states for testing purposes
 * Remove this file in production
 */
import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Button } from '@ui-kitten/components'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import ConnectionStatus, { ConnectionState } from './ConnectionStatus'

const ConnectionStatusDemo: React.FC = () => {
  const [currentState, setCurrentState] = useState<ConnectionState>(
    ConnectionState.NOT_CONNECTED
  )

  const states = [
    { state: ConnectionState.NOT_CONNECTED, label: 'Not Connected' },
    { state: ConnectionState.REQUEST_SENT, label: 'Request Sent' },
    { state: ConnectionState.REQUEST_RECEIVED, label: 'Request Received' },
    { state: ConnectionState.FRIENDS, label: 'Friends' },
    { state: ConnectionState.SELF, label: 'Self (Hidden)' },
  ]

  const handleAction = (actionName: string) => {
    console.log(`Action performed: ${actionName}`)
    // You could update the state here to simulate state changes
  }

  return (
    <ScrollView style={tw`flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4 text-center`}>
        Connection Status Demo
      </Text>

      {/* Current State Display */}
      <View
        style={tw`items-center mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg`}
      >
        <Text style={tw`mb-2 font-semibold`}>
          Current State: {currentState}
        </Text>
        <ConnectionStatus
          targetUserId="demo-user"
          currentUserId="current-user"
          connectionState={currentState}
          onSendRequest={() => handleAction('Send Request')}
          onAcceptRequest={() => handleAction('Accept Request')}
          onDeclineRequest={() => handleAction('Decline Request')}
          onCancelRequest={() => handleAction('Cancel Request')}
          onStartChat={() => handleAction('Start Chat')}
          onUnfriend={() => handleAction('Unfriend')}
        />
      </View>

      {/* State Buttons */}
      <Text style={tw`text-lg font-semibold mb-3`}>Switch States:</Text>
      {states.map(({ state, label }) => (
        <Button
          key={state}
          style={tw`mb-2`}
          appearance={currentState === state ? 'filled' : 'outline'}
          onPress={() => setCurrentState(state)}
        >
          {label}
        </Button>
      ))}

      {/* State Descriptions */}
      <View style={tw`mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg`}>
        <Text style={tw`text-lg font-semibold mb-2`}>State Descriptions:</Text>
        <Text style={tw`mb-1`}>
          • <Text style={tw`font-semibold`}>Not Connected:</Text> Shows "Add
          Friend" button
        </Text>
        <Text style={tw`mb-1`}>
          • <Text style={tw`font-semibold`}>Request Sent:</Text> Shows pending
          hourglass icon
        </Text>
        <Text style={tw`mb-1`}>
          • <Text style={tw`font-semibold`}>Request Received:</Text> Shows
          accept/decline buttons with notification badge
        </Text>
        <Text style={tw`mb-1`}>
          • <Text style={tw`font-semibold`}>Friends:</Text> Shows chat button
          and friends checkmark
        </Text>
        <Text>
          • <Text style={tw`font-semibold`}>Self:</Text> Hidden (shows settings
          icon instead)
        </Text>
      </View>
    </ScrollView>
  )
}

export default ConnectionStatusDemo
