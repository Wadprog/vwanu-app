import React from 'react'
import { string, object } from 'yup'
import { View, TouchableOpacity } from 'react-native'

import tw from 'lib/tailwind'
import Text from './Text'
import { Form, Submit } from './form'
import { useToggleKoreMutation } from 'store/post'
import { abbreviateNumber } from '../lib/numberFormat'
import LikerPopover from './LikersPopOver'
import useToggle from '../hooks/useToggle'
import Kore from '../assets/svg/Kore'

interface PostInputModalInterface {
  id: string
  isReactor: boolean
  amountOfKorems: number
  koreHeight: number
  flexDir: 'row' | 'column'
}

const ValidationSchema = object().shape({
  id: string().label('Content'),
})

const PostInputModal: React.FC<PostInputModalInterface> = ({
  id,
  flexDir,
  koreHeight,
  amountOfKorems,
  isReactor,
}) => {
  const [toggleKore, { isLoading }] = useToggleKoreMutation()
  const [showLikers, toggleLikers] = useToggle(false)

  const handleSubmit = async () => {
    await toggleKore(id)
  }

  const handleLongPress = () => {
    toggleLikers()
  }

  const LikeCount = () => (
    <TouchableOpacity onLongPress={handleLongPress}>
      <Text
        category="c1"
        appearance="hint"
        style={tw`text-black text-sm font-thin ${
          flexDir === 'row' ? '-mr' : ''
        }`}
      >
        {abbreviateNumber(amountOfKorems)}
      </Text>
    </TouchableOpacity>
  )

  if (isReactor) {
    return (
      <View style={tw`flex-${flexDir} -gap-1 items-center`}>
        <LikeCount />
        <View style={tw`opacity-80`}>
          <Kore width={koreHeight} height={koreHeight} />
        </View>
        {amountOfKorems > 0 && showLikers && (
          <LikerPopover id={id} visible={showLikers} onDismiss={toggleLikers} />
        )}
      </View>
    )
  }

  return (
    <View style={tw`flex-${flexDir} -gap-1 items-center`}>
      <LikeCount />
      <Form
        validationSchema={ValidationSchema}
        initialValues={{ id }}
        onSubmit={handleSubmit}
        style={tw`-m-1`}
      >
        <Submit
          disabled={isLoading}
          appearance="ghost"
          accessoryRight={() => <Kore width={koreHeight} height={koreHeight} />}
          size="small"
          style={tw`-m-1 -p-1`}
        />
      </Form>
      {showLikers && amountOfKorems > 0 && (
        <LikerPopover id={id} visible={showLikers} onDismiss={toggleLikers} />
      )}
    </View>
  )
}

export default PostInputModal
