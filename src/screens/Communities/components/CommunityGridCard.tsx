import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { View, ImageBackground, TouchableOpacity } from 'react-native'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import AvatarGroup from 'components/AvatarGroups'
import {
  CommunityStackParams,
  CommunityInterface,
  Notice,
} from '../../../../types'
import LongText from 'components/LongText'
import PrivacyNotice from 'components/PrivacyNotice'
import Button from 'components/Button'
import { Ionicons } from '@expo/vector-icons'

type NavigationProp = StackNavigationProp<CommunityStackParams, 'Communities'>

interface Props {
  community: CommunityInterface
  size?: 'small' | 'large'
  onCommunityPress?: () => void
  style?: any
  displayDetails?: boolean
}

const CommunityGridCard: React.FC<Props> = ({
  displayDetails = false,
  community,
  size = 'small',
  onCommunityPress,
  style,
}) => {
  const navigation = useNavigation<NavigationProp>()

  const handlePress = () => {
    if (community.isCreateCard) {
      navigation.navigate('CreateCommunity')
    } else {
      if (onCommunityPress) {
        onCommunityPress()
        return
      }
      navigation.navigate('CommunityDetail', {
        communityId: community.id.toString(),
      })
    }
  }

  const height = size === 'small' ? 48 : 80
  const amountOfMembers = community.numMembers + community.numAdmins
  return (
    <TouchableOpacity
      style={[tw`rounded-3xl overflow-hidden h-${height} w-full `, style]}
      onPress={handlePress}
    >
      <ImageBackground
        source={{ uri: community.profilePicture }}
        style={tw`w-full h-full`}
        resizeMode="cover"
      >
        <View
          style={tw`bg-black bg-opacity-50 h-full flex justify-between p-3`}
        >
          {displayDetails && (
            <View style={tw`pt-10`}>
              <View style={tw` flex-row items-center justify-between`}>
                <Button
                  accessoryRight={() => (
                    <Ionicons name="arrow-back" size={24} color="white" />
                  )}
                  onPress={() => navigation.goBack()}
                  appearance="ghost"
                />
                <Button
                  accessoryRight={() => (
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  )}
                  onPress={() => navigation.goBack()}
                  appearance="ghost"
                />
              </View>
            </View>
          )}
          <View style={tw`flex-row flex-wrap ${displayDetails ? 'pt-10' : ''}`}>
            {community.interests?.slice(0, 3).map((interest) => (
              <View
                key={interest.id}
                style={tw`bg-white bg-opacity-80 px-3 py-1 rounded-full mr-2 mb-2`}
              >
                <Text style={tw`text-black text-xs font-medium`}>
                  {interest.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Bottom section with community info */}
          <View>
            <Text
              category={size === 'small' ? 'p1' : 'h4'}
              style={tw`text-white pt-3 font-bold ${
                size === 'small' ? 'text-base' : 'text-2xl'
              } mb-2 leading-5`}
            >
              {community.name}
            </Text>

            <LongText
              text={community.description}
              maxLength={size === 'small' ? 10 : 150}
              showMoreText=">>"
              showLessText="Show less"
              style={tw`text-white -mt-5`}
            />

            <View style={tw`flex-row items-center justify-between mt-5`}>
              <View style={tw`flex-row items-center`}>
                <AvatarGroup avatars={community.members || []} size={25} />
                {amountOfMembers && (
                  <Text style={tw`text-white text-xs ml-2`}>
                    {new Intl.NumberFormat('en-US', {
                      trailingZeroDisplay: 'stripIfInteger',
                      minimumFractionDigits: 2,
                    }).format(amountOfMembers)}{' '}
                    member {amountOfMembers > 1 ? 's+' : ''}
                  </Text>
                )}
              </View>
              {community.isMember ? (
                <View style={tw`bg-white bg-opacity-90 px-3 py-1 rounded-full`}>
                  <Text style={tw`text-black font-semibold text-xs`}>
                    {community.isMember.role.toUpperCase()}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={tw`bg-white bg-opacity-90 px-3 py-1 rounded-full`}
                >
                  <Text style={tw`text-black font-semibold text-xs`}>Join</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default CommunityGridCard
