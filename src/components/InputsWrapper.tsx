import React from 'react'
import { View, TouchableOpacity, Pressable } from 'react-native'

// Custom import
import Text from './Text'
import tw from '../lib/tailwind'
import { useTailwindTheme } from '../hooks/useTailwindTheme'

export interface WrapperProps {
  label?: string
  style?: object
  children?: React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onIconRightPress?: () => void
  onIconLeftPress?: () => void
  disabled?: boolean
  isFocus?: boolean
  onPress?: () => void
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { combinations } = useTailwindTheme()

  // Use the pre-defined input color combination from our custom theme
  const inputColors = combinations.input
  const borderColor = props.isFocus
    ? inputColors.borderFocus
    : inputColors.border

  return (
    <Pressable onPress={props.onPress} disabled={props.disabled}>
      <>
        {props.label && (
          <Text
            style={[tw`mb-1`, { color: inputColors.placeholder }]}
            category="c1"
            appearance="hint"
          >
            {props.label}
          </Text>
        )}
        <View
          style={[
            tw`p-2 mb-1 border flex ${props.disabled ? 'opacity-50' : ''}`,
            {
              backgroundColor: inputColors.background,
              borderColor,
            },
            props.style,
          ]}
        >
          <View style={tw`flex py-1 flex-row items-center justify-between`}>
            {props.iconLeft && (
              <TouchableOpacity
                onPress={props.disabled ? () => {} : props.onIconLeftPress}
              >
                {props.iconLeft}
              </TouchableOpacity>
            )}

            <View>{props.children}</View>

            {props.iconRight && (
              <TouchableOpacity
                onPress={props.disabled ? undefined : props.onIconRightPress}
              >
                {props.iconRight}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    </Pressable>
  )
}

export default React.memo(Wrapper)
