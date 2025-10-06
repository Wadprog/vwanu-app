import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Text from 'components/Text'
import tw from 'lib/tailwind'
import { CommunityPrivacyType } from '../../../../types'

interface Props {
  privacyType: CommunityPrivacyType
  requireApproval: boolean
  onPrivacyTypeChange: (type: CommunityPrivacyType) => void
  onApprovalChange: (requireApproval: boolean) => void
}

const PrivacySettings: React.FC<Props> = ({
  privacyType,
  requireApproval,
  onPrivacyTypeChange,
  onApprovalChange,
}) => {
  const privacyOptions = [
    {
      type: 'public' as CommunityPrivacyType,
      icon: 'globe-outline' as const,
      title: 'Public',
      description: 'Anyone can see and join this community',
      infoText:
        'Your community will be discoverable by all users and appear in search results.',
    },
    {
      type: 'private' as CommunityPrivacyType,
      icon: 'people-outline' as const,
      title: 'Private',
      description:
        'Only members can see content, but the community is searchable',
      infoText:
        'Your community will appear in search but only members can see posts and content.',
    },
    {
      type: 'hidden' as CommunityPrivacyType,
      icon: 'lock-closed-outline' as const,
      title: 'Hidden',
      description: 'Completely hidden from search, invite-only access',
      infoText:
        'Your community will be completely hidden from search and only accessible by invitation.',
    },
  ]

  const renderToggle = (value: boolean, onToggle: (value: boolean) => void) => (
    <TouchableOpacity
      style={[
        tw`w-12 h-6 rounded-full flex-row items-center px-1`,
        value ? tw`bg-blue-500` : tw`bg-gray-300`,
      ]}
      onPress={() => onToggle(!value)}
    >
      <View
        style={[
          tw`w-4 h-4 rounded-full bg-white`,
          value ? tw`ml-auto` : tw`ml-0`,
        ]}
      />
    </TouchableOpacity>
  )

  const renderPrivacyOption = (option: (typeof privacyOptions)[0]) => {
    const isSelected = privacyType === option.type

    return (
      <TouchableOpacity
        key={option.type}
        style={[
          tw`flex-row items-start p-4 rounded-xl border-2 mb-3`,
          isSelected
            ? tw`border-blue-500 bg-blue-50`
            : tw`border-gray-200 bg-white`,
        ]}
        onPress={() => onPrivacyTypeChange(option.type)}
      >
        <View style={tw`mr-3 mt-1`}>
          <Ionicons
            name={option.icon}
            size={24}
            color={isSelected ? '#3B82F6' : '#6B7280'}
          />
        </View>
        <View style={tw`flex-1`}>
          <Text
            style={[
              tw`font-semibold text-base mb-1`,
              isSelected ? tw`text-blue-800` : tw`text-gray-800`,
            ]}
          >
            {option.title}
          </Text>
          <Text
            style={[
              tw`text-sm leading-5`,
              isSelected ? tw`text-blue-700` : tw`text-gray-600`,
            ]}
          >
            {option.description}
          </Text>
        </View>
        <View style={tw`ml-3 mt-1`}>
          <View
            style={[
              tw`w-5 h-5 rounded-full border-2 items-center justify-center`,
              isSelected
                ? tw`border-blue-500 bg-blue-500`
                : tw`border-gray-300`,
            ]}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={12} color="white" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const selectedOption = privacyOptions.find(
    (option) => option.type === privacyType
  )

  return (
    <View style={tw`bg-white px-4 py-6 border-b border-gray-100`}>
      <Text category="h6" style={tw`font-semibold text-lg mb-4`}>
        Privacy & Access
      </Text>

      {/* Privacy Type Selection */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 font-medium text-base mb-3`}>
          Who can see this community?
        </Text>
        {privacyOptions.map(renderPrivacyOption)}
      </View>

      {/* Member Approval Setting - Only show for public and private communities */}
      {privacyType !== 'hidden' && (
        <View style={tw`flex-row justify-between items-start mb-6`}>
          <View style={tw`flex-1 mr-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#6B7280"
                style={tw`mr-2`}
              />
              <Text style={tw`text-gray-800 font-medium text-base`}>
                Require Approval
              </Text>
            </View>
            <Text style={tw`text-gray-600 text-sm leading-5`}>
              {privacyType === 'private'
                ? 'Review join requests before accepting new members'
                : 'Moderators must approve new members before they can join'}
            </Text>
          </View>
          {renderToggle(requireApproval, onApprovalChange)}
        </View>
      )}

      {/* Info box */}
      <View style={tw`bg-blue-50 p-4 rounded-xl`}>
        <View style={tw`flex-row items-start`}>
          <Ionicons
            name="information-circle"
            size={20}
            color="#3B82F6"
            style={tw`mr-2 mt-0.5`}
          />
          <View style={tw`flex-1`}>
            <Text style={tw`text-blue-800 font-medium text-sm mb-1`}>
              Privacy Settings
            </Text>
            <Text style={tw`text-blue-700 text-xs leading-4`}>
              {selectedOption?.infoText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PrivacySettings
