import React from 'react'
import { Divider } from '@ui-kitten/components'

import tw from '../lib/tailwind'
import { ViewStyle } from 'react-native'

interface Props {
  style?: string
}

const Separator = ({ style = '' }: Props) => (
  <Divider style={tw`my-2 ${style}`} />
)

export default Separator
