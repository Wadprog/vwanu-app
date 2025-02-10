/* 
========================================================
   Sub-Component: LikerPopover
   - Renders a popover listing users who liked the post.
======================================================== */

import React from 'react'
import { TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import { Popover, Layout } from '@ui-kitten/components'

import Text from './Text'
import tw from '../lib/tailwind'
import Separator from './Separator'
import ProfAvatar from './ProfAvatar'
import { useFetchLikesQuery } from '../store/post'
import { ActivityIndicator } from 'react-native-paper'

interface LikerPopoverProps {
  id: number
  visible: boolean
  onDismiss: () => void
}

const { width } = Dimensions.get('screen')
const LikerPopover: React.FC<LikerPopoverProps> = ({
  visible,
  onDismiss,
  ...props
}) => {
  const likers = useFetchLikesQuery(props.id)

  return (
    <Popover
      visible={visible}
      anchor={() => {
        return (
          <TouchableOpacity onPress={onDismiss}>
            <Text style={tw`text-primary font-thin`}>others</Text>
          </TouchableOpacity>
        )
      }}
      onBackdropPress={onDismiss}
      backdropStyle={tw`bg-black bg-opacity-50`}
    >
      <Layout style={[tw`bg-white p-2`, { width: width / 2 }]}>
        {likers.isLoading || likers.isFetching ? (
          <ActivityIndicator animating={true} />
        ) : (
          <FlatList
            refreshing={likers.isFetching}
            onRefresh={likers.refetch}
            data={likers.data?.data || []}
            renderItem={({ item }) => (
              <ProfAvatar
                name={`${item?.User.firstName} ${item?.User.lastName}`}
                source={item?.User.profilePicture || ''}
                size={25}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Layout>
    </Popover>
  )
}

export default LikerPopover
