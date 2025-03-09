import React from 'react'

import Text from './Text'
import tw from '../lib/tailwind'

interface PageTitlesProps {
  title: string
  subtitle?: string
}

const PageTitles: React.FC<PageTitlesProps> = ({ title, subtitle }) => {
  return (
    <>
      {title && (
        <Text category="h6" style={tw`text-black mb-[7px]`}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text category="p1" style={tw`text-black`}>
          {subtitle ?? 'Please fill the following'}
        </Text>
      )}
    </>
  )
}

export default PageTitles
