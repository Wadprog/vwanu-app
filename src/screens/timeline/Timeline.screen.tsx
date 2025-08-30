import { View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'

import tw from 'lib/tailwind'
import PostList from './PostList'
import Screen from 'components/screen'
// import CommunityList from './CommunityList'
import PostInput from 'components/PostInput'
import TimelineSkeletone from './TimelineSkeletone'

const Timeline = () => {
  const [hasPost, setHasPost] = useState(false)
  const [isFetchingPost, setIsFetchingPost] = useState(true) // Start with true for initial loading
  const [hasLoaded, setHasLoaded] = useState(false)

  // Optimized callbacks to prevent unnecessary re-renders
  const handleSetIsFetching = useCallback((isFetching: boolean) => {
    setIsFetchingPost(isFetching)
  }, [])

  const handleSetHasPost = useCallback((hasPosts: boolean) => {
    setHasPost(hasPosts)
    setHasLoaded(true) // Mark as loaded when we get post data (whether true or false)
  }, [])

  // Debug logging (only in development)
  useEffect(() => {
    if (__DEV__) {
      // console.log('Timeline State:', { hasPost, isFetchingPost, hasLoaded })
    }
  }, [hasPost, isFetchingPost, hasLoaded])

  // Show skeleton only if we haven't loaded yet and are fetching
  // if (!hasLoaded && isFetchingPost) {
  //   return <TimelineSkeletone />
  // }

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
