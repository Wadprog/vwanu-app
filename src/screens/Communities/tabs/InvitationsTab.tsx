import React from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import tw from 'lib/tailwind'
import Text from 'components/Text'

interface Invitation {
  id: string
  user: {
    name: string
    username: string
    profilePicture?: string
  }
  invitedBy: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

interface InvitationsTabProps {
  communityId: string | number
}

const InvitationsTab: React.FC<InvitationsTabProps> = ({ communityId }) => {
  // TODO: Fetch actual invitations from API
  const mockInvitations: Invitation[] = [
    {
      id: '1',
      user: {
        name: 'Alice Williams',
        username: '@alicew',
        profilePicture: 'https://i.pravatar.cc/150?img=5',
      },
      invitedBy: 'John Doe',
      date: '2 hours ago',
      status: 'pending',
    },
    {
      id: '2',
      user: {
        name: 'Mike Brown',
        username: '@mikeb',
        profilePicture: 'https://i.pravatar.cc/150?img=6',
      },
      invitedBy: 'Jane Smith',
      date: '1 day ago',
      status: 'pending',
    },
  ]

  const handleApprove = (id: string) => {
    console.log('Approve invitation:', id)
    // TODO: Call API to approve
  }

  const handleReject = (id: string) => {
    console.log('Reject invitation:', id)
    // TODO: Call API to reject
  }

  const renderInvitation = ({ item }: { item: Invitation }) => (
    <View style={tw`bg-white p-4 border-b border-gray-100`}>
      <View style={tw`flex-row items-start`}>
        <Image
          source={{ uri: item.user.profilePicture }}
          style={tw`w-12 h-12 rounded-full`}
        />
        <View style={tw`flex-1 ml-3`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Text style={tw`font-semibold text-base`}>{item.user.name}</Text>
              <Text style={tw`text-gray-600 text-sm`}>
                {item.user.username}
              </Text>
            </View>
            <Text style={tw`text-gray-400 text-xs`}>{item.date}</Text>
          </View>

          <Text style={tw`text-gray-600 text-sm mt-1`}>
            Invited by <Text style={tw`font-medium`}>{item.invitedBy}</Text>
          </Text>

          {item.status === 'pending' && (
            <View style={tw`flex-row mt-3 gap-2`}>
              <TouchableOpacity
                style={tw`flex-1 bg-blue-500 py-2 rounded-full items-center`}
                onPress={() => handleApprove(item.id)}
              >
                <Text style={tw`text-white font-semibold text-sm`}>
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1 bg-gray-200 py-2 rounded-full items-center`}
                onPress={() => handleReject(item.id)}
              >
                <Text style={tw`text-gray-700 font-semibold text-sm`}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  )

  const EmptyState = () => (
    <View style={tw`flex-1 items-center justify-center p-8`}>
      <View
        style={tw`w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4`}
      >
        <Ionicons name="mail-open-outline" size={40} color="#9CA3AF" />
      </View>
      <Text style={tw`text-gray-900 font-semibold text-lg mb-2`}>
        No Pending Invitations
      </Text>
      <Text style={tw`text-gray-600 text-center text-sm`}>
        When members request to join, they'll appear here for approval
      </Text>
    </View>
  )

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <FlatList
        data={mockInvitations}
        renderItem={renderInvitation}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={
          mockInvitations.length === 0 ? tw`flex-1` : tw`pb-4`
        }
      />
    </View>
  )
}

export default InvitationsTab
