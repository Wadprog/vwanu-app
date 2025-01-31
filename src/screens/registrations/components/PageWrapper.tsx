import React from 'react'

import { View, ImageBackground } from 'react-native'

import tw from '../../../lib/tailwind'
import images from '../../../config/image'
import Screen, { ScreenProps } from '../../../components/screen'
import PageTitles from '../../../components/PageTitles'
import NavigationDots from '../../../components/NavigationDots'

interface PageWrapperProps extends Omit<ScreenProps, 'children'> {
  title: string
  subtitle?: string
  children: React.ReactNode
  pageNumber?: number
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  subtitle,
  children,
  pageNumber = null,
  ...otherProps
}) => {
  return (
    <Screen {...otherProps}>
      <ImageBackground
        style={tw`px-5 flex-1 flex content-center justify-center`}
        source={images.regiterBg}
      >
        <View style={tw`mb-5 mt-10`}>
          <PageTitles title={title} subtitle={subtitle} />
        </View>
        {children}

        {pageNumber ? (
          <View style={tw`mb-4`}>
            <NavigationDots selected={pageNumber} total={4} />
          </View>
        ) : null}
      </ImageBackground>
    </Screen>
  )
}

export default PageWrapper
