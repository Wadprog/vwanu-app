import React from 'react'
import { TextInput } from 'react-native'

import Wrapper, { WrapperProps } from './InputsWrapper'

export type P = React.ComponentProps<typeof TextInput> &
  WrapperProps & {
    secureTextEntry?: boolean
    showPasswordToggle?: boolean
  }

const AppInput: React.FC<P> = (props) => {
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
      onPress={() => inputRef.current?.focus()}
    >
      <TextInput
        ref={inputRef}
        {...rest}
        onFocus={onFocus && onFocus}
        onBlur={props.onBlur && props.onBlur}
      />
    </Wrapper>
  )
}

export default React.memo(AppInput)
