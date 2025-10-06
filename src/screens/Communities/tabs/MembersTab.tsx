import React from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import tw from 'lib/tailwind'
import Text from 'components/Text'
// import { useFetchCommunityMembersQuery } from '../../../store/communities-api-slice'

interface Member {
  id: string
  name: string
  username: string
  profilePicture?: string
  role: 'admin' | 'moderator' | 'member'
}

interface MembersTabProps {
  communityId: string
}

const MembersTab: React.FC<MembersTabProps> = ({ communityId }) => {
  //   const { data: members, isLoading, error } = useFetchCommunityMembersQuery(communityId)
  // TODO: Fetch actual members from API
  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      username: '@johndoe',
      role: 'admin',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: '@janesmith',
      role: 'moderator',
      profilePicture: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      username: '@bobjohnson',
      role: 'member',
      profilePicture: 'https://i.pravatar.cc/150?img=3',
    },
  ]

  const getRoleBadgeColor = (role: Member['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500'
      case 'moderator':
        return 'bg-blue-500'
      default:
        return 'bg-gray-400'
    }
  }

  const renderMember = ({ item }: { item: Member }) => (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 bg-white border-b border-gray-100`}
    >
      <Image
        source={{ uri: item.profilePicture }}
        style={tw`w-12 h-12 rounded-full`}
      />
      <View style={tw`flex-1 ml-3`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`font-semibold text-base`}>{item.name}</Text>
          {item.role !== 'member' && (
            <View
              style={tw`${getRoleBadgeColor(
                item.role
              )} px-2 py-0.5 rounded-full ml-2`}
            >
              <Text style={tw`text-white text-xs font-medium uppercase`}>
                {item.role}
              </Text>
            </View>
          )}
        </View>
        <Text style={tw`text-gray-600 text-sm`}>{item.username}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`bg-white p-4 border-b border-gray-200`}>
        <View
          style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2`}
        >
          <Ionicons name="search" size={20} color="#6B7280" />
          <Text style={tw`ml-2 text-gray-500`}>Search members...</Text>
        </View>
      </View>

      <FlatList
        data={mockMembers}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-4`}
      />
    </View>
  )
}

export default MembersTab
