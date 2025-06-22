import React from 'react'
import { TouchableOpacity, View, TextProps } from 'react-native'
import Text from './Text'
import tw from '../lib/tailwind'
import useToggle from '../hooks/useToggle'

interface LongTextProps extends TextProps {
  text: string
  maxLength?: number
  showMoreText?: string
  showLessText?: string
  textStyles?: string // For tailwind styles
}

const LongText: React.FC<LongTextProps> = ({
  text,
  maxLength = 150,
  showMoreText = 'Show more',
  showLessText = 'Show less',
  textStyles = '',
  ...textProps
}) => {
  const [isExpanded, toggleExpanded] = useToggle(false)
  const shouldTruncate = text.length > maxLength

  const displayText =
    shouldTruncate && !isExpanded ? `${text.slice(0, maxLength)}...` : text

  const toggleButton = shouldTruncate && (
    <TouchableOpacity onPress={toggleExpanded}>
      <Text style={tw`text-primary text-sm ml-1`}>
        {isExpanded ? showLessText : showMoreText}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={tw`flex flex-row flex-wrap items-center`}>
      <Text style={tw`${textStyles}`} {...textProps}>
        {displayText}
      </Text>
      {toggleButton}
    </View>
  )
}

export default LongText
