import React from 'react'
import { TextInput } from 'react-native'

import Wrapper, { WrapperProps } from './InputsWrapper'

export type P = React.ComponentProps<typeof TextInput> & WrapperProps

// type P = WrapperProps & Props

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

  return (
    <Wrapper
      label={label}
      iconLeft={iconLeft}
      iconRight={iconRight}
      style={style}
      onIconLeftPress={onIconLeftPress}
      onIconRightPress={onIconLeftPress}
      isFocus={isfocus}
    >
      <TextInput
        {...rest}
        onFocus={(e) => {
          setIsFocus(true)
          onFocus && onFocus(e)
        }}
      />
    </Wrapper>
  )
}

export default AppInput
