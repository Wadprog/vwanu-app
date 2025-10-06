import React, { useState } from 'react'
import { TabBar, Tab, Layout } from '@ui-kitten/components'
import Screen from 'components/screen'
import CommunityList from './CommunityList'

type TabType = 'mine' | 'others'

const CommunitiesListNavigator: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('mine')

  const handleTabSelect = (index: number) => {
    setSelectedTab(index === 0 ? 'mine' : 'others')
  }

  return (
    <Screen>
      <TabBar
        selectedIndex={selectedTab === 'mine' ? 0 : 1}
        onSelect={handleTabSelect}
      >
        <Tab title="Mine" />
        <Tab title="Others" />
      </TabBar>

      <Layout style={{ flex: 1 }}>
        {selectedTab === 'mine' && <CommunityList communityListType="mine" />}
        {selectedTab === 'others' && (
          <CommunityList communityListType="others" />
        )}
      </Layout>
    </Screen>
  )
}

export default CommunitiesListNavigator
