import React from 'react'

import { View, ImageBackground, StyleProp, ViewStyle } from 'react-native'

import tw from '../lib/tailwind'
import images from '../config/image'
import Screen, { ScreenProps } from './screen'
import PageTitles from './PageTitles'
import NavigationDots from './NavigationDots'

interface PageWrapperProps extends Omit<ScreenProps, 'children'> {
  title?: string
  subtitle?: string
  children?: React.ReactNode
  pageNumber?: number
  style?: StyleProp<ViewStyle>
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  subtitle,
  children,
  pageNumber = null,
  style = {},
  ...otherProps
}) => {
  return (
    <Screen {...otherProps}>
      <ImageBackground
        style={[tw`p-3 flex-1 flex content-center justify-center`, style]}
        source={images.registerBg}
      >
        {(title || subtitle) && (
          <View style={tw`mb-5 mt-10`}>
            <PageTitles title={title ?? ''} subtitle={subtitle} />
          </View>
        )}
        {children && children}

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
