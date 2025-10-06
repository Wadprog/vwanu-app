import React from 'react'
import { View } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

import tw from 'lib/tailwind'
import Screen from 'components/screen'
import { Tabs, TabContent } from '../../components/Tabs'
import { CommunityGridCard, CommunityStats } from './components'
import { CommunityInterface, CommunityStackParams } from '../../../types'
import { useFetchCommunityQuery } from '../../store/communities-api-slice'

// Tab components
import PostsTab from './tabs/PostsTab'
import MembersTab from './tabs/MembersTab'
import SettingsTab from './tabs/SettingsTab'
import InvitationsTab from './tabs/InvitationsTab'

type CommunityDetailRouteProp = RouteProp<
  CommunityStackParams,
  'CommunityDetail'
>
const CommunityDetail = () => {
  const route = useRoute<CommunityDetailRouteProp>()
  const { communityId } = route.params
  const {
    data: community,
    isLoading,
    error,
  } = useFetchCommunityQuery(communityId)

  const tabs: TabContent[] = [
    {
      id: 'posts',
      label: 'Posts',
      icon: 'newspaper-outline',
      component: <PostsTab communityId={communityId} />,
    },
    {
      id: 'members',
      label: 'Members',
      icon: 'people-outline',
      component: <MembersTab communityId={communityId} />,
    },
    {
      id: 'invitations',
      label: 'Invites',
      icon: 'mail-outline',
      component: <InvitationsTab communityId={communityId} />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings-outline',
      component: <SettingsTab communityId={communityId} />,
    },
  ]
  return (
    <Screen loading={isLoading} error={error as any} safeArea={false}>
      <View style={tw`flex-1`}>
        <CommunityGridCard
          community={community as CommunityInterface}
          size="large"
          onCommunityPress={() => {}}
          style={tw`rounded-none`}
          displayDetails={true}
        />

        <CommunityStats
          numMembers={community?.numMembers || 0}
          numAdmins={community?.numAdmins || 0}
          numPosts={15}
        />

        <Tabs tabs={tabs} defaultTab="posts" />
      </View>
    </Screen>
  )
}

export default CommunityDetail
