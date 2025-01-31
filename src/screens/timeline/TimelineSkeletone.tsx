import { useReducer } from 'react'
import { StyleSheet, View } from 'react-native'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'

import tw from '../../lib/tailwind'
export default function HelloWorld() {
  const [dark, toggle] = useReducer((s) => !s, true)

  const colorMode = 'light'

  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: dark ? '#000000' : '#ffffff' }}
    >
      <View style={tw` flex flex-row items-between`}>
        <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
        <Spacer />
      </View>

      <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <View style={tw` flex flex-row items-between`}>
        <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
        <Spacer />
      </View>

      <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <View style={tw` flex flex-row items-between`}>
        <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
        <Spacer />
      </View>

      <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <View style={tw` flex flex-row items-between`}>
        <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
        <Spacer />
      </View>

      <Skeleton colorMode={colorMode} width={250} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
      <Spacer height={8} />
      <Skeleton colorMode={colorMode} width={'100%'} />
    </MotiView>
  )
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  padded: {
    padding: 16,
  },
})
