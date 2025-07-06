import { View } from 'react-native'
import React, { useState } from 'react'

import tw from 'lib/tailwind'
import PostList from './PostList'
import Screen from 'components/screen'
import CommunityList from './CommunityList'
import PostInput from 'components/PostInput'
import TimelineSkeletone from './TimelineSkeletone'

const Timeline = () => {
  const [hasPost, setHasPost] = useState(false)
  const [isFetchingPost, setIsFetchingPost] = useState(false)

  if (isFetchingPost && !hasPost) {
    return <TimelineSkeletone />
  }
  return (
    <Screen loading={false} loadingScreen={<TimelineSkeletone />} error={null}>
      <View style={tw`bg-white p-3 relative`}>
        {/* <BannerList />  */}
        <View style={tw`mt-3`}>
          <PostInput />
        </View>
        <CommunityList />
        <View>
          <PostList setIsFetching={setIsFetchingPost} setHasPost={setHasPost} />
        </View>
      </View>
    </Screen>
  )
}

export default Timeline
