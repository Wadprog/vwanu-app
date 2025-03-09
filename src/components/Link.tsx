import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Text from './Text'
import tw from '../lib/tailwind'

interface LinkProps {
  text: string
  to?: string
  style?: object
  onPress?: () => void
}

const Link: React.FC<LinkProps> = ({ text, to, style = {}, onPress }) => {
  React.useEffect(() => {
    if (!to && !onPress) {
      throw new Error('Either "to" or "onPress" must be provided')
    }
  }, [to, onPress])
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress()
        }
        if (to) {
          // @ts-ignore
          navigation.navigate(to)
        }
      }}
    >
      <Text category="c1" appearance="hint" style={[tw`text-blue-500`, style]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default Link
