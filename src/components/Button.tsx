/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'

import { Button, ButtonProps } from '@ui-kitten/components'

// Custom dependencies
import Text from './Text'
import tw from '../lib/tailwind'

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
  return (
    <Button onPress={onPress} {...props}>
      {title &&
        (textStyle ? (
          <Text style={[tw`text-black`, textStyle]}>{title.trim()}</Text>
        ) : (
          <Text style={[tw`text-black`]}>{title.trim()}</Text>
        ))}
    </Button>
  )
}

export default Btn
