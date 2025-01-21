/* 
========================================================
   Sub-Component: PostFooter
   - Renders like info, share, and comment buttons.
======================================================== */

import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'

import Text from './Text'
import tw from '../lib/tailwind'
import Kore from '../assets/svg/Kore'
import { PostProps } from '../../types'
import LikerPopover from './LikersPopOver'
import { abbreviateNumber } from '../lib/numberFormat'

interface Props extends PostProps {
  showViewComment?: boolean
}

interface PostFooterProps extends Props {
  toggleCommenting: () => void
  toggleLikerPopover: () => void
  seeLikers: boolean
  likers: any // Adjust type as needed
}

const PostFooter: React.FC<PostFooterProps> = (props) => {
  const navigation = useNavigation()

  const moreReactors = props.isReactor
    ? (props.amountOfKorems ?? 0) - 1
    : (props.amountOfKorems ?? 0) - (props.reactors?.length - 2 || 0)

  console.log({ moreReactors, id: props.id, r: props.reactors?.length })
  console.log('ok')

  return (
    <View style={tw`flex flex-row items-center justify-between`}>
      <View>
        {props.amountOfKorems ? (
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-black font-thin`}>Liked by</Text>
            {props.isReactor && (
              <TouchableOpacity onPress={() => {}}>
                <Text style={tw`text-primary`}>You, </Text>
              </TouchableOpacity>
            )}
            {props.isReactor ? (
              <TouchableOpacity onPress={() => {}}>
                <Text style={tw`text-black`}>
                  {props.reactors && props.reactors[0]?.firstName}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {}}>
                <Text style={tw`text-black`}>
                  {props.reactors &&
                    props.reactors.map((u: any) => u.firstName).join(',')}
                </Text>
              </TouchableOpacity>
            )}
            {moreReactors > 0 && (
              <>
                <Text style={tw`text-black font-thin`}>and</Text>
                <Text style={tw`text-black`}>
                  {abbreviateNumber(moreReactors)}+
                </Text>
                <LikerPopover
                  id={props.id}
                  visible={props.seeLikers}
                  onDismiss={props.toggleLikerPopover}
                />
              </>
            )}
          </View>
        ) : (
          <Text style={tw`text-black font-thin`}>Be the first to Kore</Text>
        )}

        {props.showViewComment && (props.amountOfComments ?? 0) > 0 && (
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate('Comment', {
                ...props,
                showViewComment: false,
              })
            }}
          >
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-primary font-thin text-sm`}>View all </Text>
              <Text style={tw`text-primary text-sm`}>
                {abbreviateNumber(props.amountOfComments || 0)}
              </Text>
              <Text style={tw`text-primary font-thin text-sm`}> comments</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`self-end`}>
          <Ionicons name="share-outline" size={24} color="black" />
        </View>
        <View style={tw`mx-2 items-center`}>
          <TouchableOpacity onPress={props.toggleLikerPopover}>
            <Text
              category="c1"
              appearance="hint"
              style={tw`text-black text-sm font-thin`}
            >
              {abbreviateNumber(props.amountOfKorems || 0)}
            </Text>
          </TouchableOpacity>
          {props.isReactor ? (
            <Kore />
          ) : (
            <TouchableOpacity>
              <Kore />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`items-center`}>
          <Text
            category="c1"
            appearance="hint"
            style={tw`text-black text-sm font-thin`}
          >
            {abbreviateNumber(props.amountOfComments || 0)}
          </Text>
          <TouchableOpacity onPress={props.toggleCommenting}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PostFooter
