/* 
========================================================
   Sub-Component: PostFooter
   - Renders like info, share, and comment buttons.
======================================================== */

import React, { memo, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'

import Text from './Text'
import tw from '../lib/tailwind'
import { PostProps } from '../../types'
import LikerPopover from './LikersPopOver'
import { abbreviateNumber } from '../lib/numberFormat'
import LikeForm from './LikeForm'

interface Props extends PostProps {
  showViewComment?: boolean
}

interface PostFooterProps extends Props {
  toggleCommenting: () => void
  toggleLikerPopover: () => void
  seeLikers: boolean
  showViewComment?: boolean
  disableNavigation?: boolean
}

const PostFooter: React.FC<PostFooterProps> = (props) => {
  const navigation = useNavigation()
  const moreReactors = props.isReactor
    ? (props.amountOfKorems ?? 0) - 1
    : (props.amountOfKorems ?? 0) - (props.reactors?.length - 2 || 0)

  const handleCommentPress = useCallback(() => {
    if (props.disableNavigation) {
      // We're in SinglePost view, just toggle the comment form
      props.toggleCommenting()
    } else {
      // Navigate to SinglePost with comment form open
      // @ts-ignore
      navigation.navigate('SinglePost', {
        postId: props.id,
        isCommenting: true,
      })
    }
  }, [props.disableNavigation, props.toggleCommenting, props.id, navigation])

  return (
    <View style={tw`flex flex-row items-center justify-between`}>
      <View>
        {props.amountOfKorems ? (
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-sm font-thin`}>Liked by</Text>
            {props.isReactor && (
              <TouchableOpacity onPress={() => {}}>
                <Text style={tw`text-primary font-thin text-sm`}> You</Text>
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
                  id={props.id.toString()}
                  visible={props.seeLikers}
                  onDismiss={props.toggleLikerPopover}
                />
              </>
            )}
          </View>
        ) : (
          <Text style={tw`font-thin text-sm`}>
            Be the first to
            <Text style={tw`text-sm font-thin italic`}> Kore</Text>
          </Text>
        )}

        {props.showViewComment && (props.amountOfComments ?? 0) > 0 && (
          <TouchableOpacity onPress={handleCommentPress}>
            <Text style={tw`text-primary font-thin text-sm`}>
              View all{' '}
              <Text style={tw`text-primary text-sm`}>
                {abbreviateNumber(props.amountOfComments || 0)}
              </Text>
              <Text style={tw`text-primary font-thin text-sm`}> comments</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`self-end flex-row items-center`}>
          <Ionicons name="share-outline" size={15} color="black" />
        </View>
        <View style={tw`mx-2 items-center`}>
          <LikeForm
            id={props.id.toString()}
            isReactor={!!props.isReactor}
            amountOfKorems={+props.amountOfKorems}
            koreHeight={18}
            flexDir="column"
          />
        </View>
        <View style={tw`items-center`}>
          <Text
            category="c1"
            appearance="hint"
            style={tw`text-black text-sm font-thin`}
          >
            {abbreviateNumber(props.amountOfComments || 0)}
          </Text>
          <TouchableOpacity onPress={handleCommentPress}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={15}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// Memoize PostFooter with custom comparison
const MemoizedPostFooter = memo(PostFooter, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.amountOfKorems === nextProps.amountOfKorems &&
    prevProps.amountOfComments === nextProps.amountOfComments &&
    prevProps.isReactor === nextProps.isReactor &&
    prevProps.seeLikers === nextProps.seeLikers &&
    prevProps.showViewComment === nextProps.showViewComment &&
    prevProps.reactors?.length === nextProps.reactors?.length
  )
})

MemoizedPostFooter.displayName = 'PostFooter'

export default MemoizedPostFooter
