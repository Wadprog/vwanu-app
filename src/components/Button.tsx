/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'

import { Button, ButtonProps } from '@ui-kitten/components'

// Custom dependencies
import Text from './Text'
import tw from '../lib/tailwind'
import { useTailwindTheme } from '../hooks/useTailwindTheme'

export interface BtnProps extends ButtonProps {
  title?: string
  textStyle?: object
}

const Btn: React.FC<BtnProps> = ({
  title,
  onPress,
  textStyle = undefined,
  ...props
}) => {
  const { combinations, colors } = useTailwindTheme()

  // Get appropriate text color based on button appearance using our theme combinations
  const getTextColor = () => {
    if (textStyle?.color) return textStyle.color

    // Use our pre-defined button color combinations
    switch (props.appearance) {
      case 'ghost':
        return combinations.button.ghost.text
      case 'outline':
        return combinations.button.ghost.text
      case 'filled':
        return combinations.button.primary.text
      default:
        return colors.text.primary
    }
  }

  const textColor = getTextColor()

  return (
    <Button onPress={onPress} {...props}>
      {title &&
        (textStyle ? (
          <Text style={[{ color: textColor }, textStyle]}>{title.trim()}</Text>
        ) : (
          <Text style={{ color: textColor }}>{title.trim()}</Text>
        ))}
    </Button>
  )
}

export default Btn
