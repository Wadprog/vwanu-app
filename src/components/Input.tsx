import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'

import Wrapper, { WrapperProps } from './InputsWrapper'

export type P = React.ComponentProps<typeof TextInput> &
  WrapperProps & {
    secureTextEntry?: boolean
    showPasswordToggle?: boolean
  }

const AppInput: React.FC<P> = (props) => {
  const [isfocus, setIsFocus] = React.useState(false)
  const {
    label,
    iconLeft,
    iconRight,
    style,
    onIconLeftPress,
    onIconRightPress,
    onFocus,
    ...rest
  } = props

  const inputRef = React.useRef<TextInput>(null)

  return (
    <Wrapper
      label={label}
      iconLeft={iconLeft}
      iconRight={iconRight}
      style={style}
      onIconLeftPress={onIconLeftPress}
      onIconRightPress={onIconRightPress}
      isFocus={isfocus}
      onPress={() => inputRef.current?.focus()}
    >
      <TextInput
        ref={inputRef}
        {...rest}
        onFocus={(e) => {
          setIsFocus(true)
          onFocus && onFocus(e)
        }}
        onBlur={(e) => {
          setIsFocus(false)
          props.onBlur && props.onBlur(e)
        }}
      />
    </Wrapper>
  )
}

export default AppInput
