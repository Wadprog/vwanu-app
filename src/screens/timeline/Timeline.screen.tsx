import { View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'

import tw from 'lib/tailwind'
import PostList from './PostList'
import Screen from 'components/screen'
// import CommunityList from './CommunityList'
import PostInput from 'components/CreatePost/PostInput'
import TimelineSkeletone from './TimelineSkeletone'

const Timeline = () => {
  return (
    <Screen loading={false} loadingScreen={<TimelineSkeletone />} error={null}>
      <View style={tw`bg-white p-3 relative`}>
        {/* <BannerList />  */}
        <View style={tw`mt-3`}>
          <PostInput />
        </View>
        {/* <CommunityList /> */}
        <View>
          <PostList />
        </View>
      </View>
    </Screen>
  )
}

export default Timeline
