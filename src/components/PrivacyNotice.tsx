import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import { Popover, Layout, Divider } from '@ui-kitten/components'

import Text from './Text'
import tw from '../lib/tailwind'
import { Notice } from '../../types'
import useToggle from '../hooks/useToggle'
import { ActivityIndicator } from 'react-native-paper'

type IconNotice = keyof typeof Ionicons.glyphMap

interface PrivacyNotice {
  privacyType: Notice
  canEdit: Boolean
  onEdit?: (newPrivacy: Notice) => void
  isEditing?: Boolean
  displayLong?: Boolean
  onBlur?: () => void
}

const notices: Notice[] = ['private', 'network', 'public']
const Separator = () => <Divider style={tw`my-2`} />

const PrivacyNotice: React.FC<PrivacyNotice> = ({
  displayLong = false,
  isEditing = false,
  ...props
}) => {
  if (props.canEdit && !props.onEdit) {
    throw new Error('onEdit function must be provided when canEdit is true')
  }
  const [modifying, toggleModifying] = useToggle(false)
  return (
    <View style={tw`flex flex-row items-center justify-center`}>
      <View style={tw`flex flex-row items-center mb-1 self-end`}>
        <Ionicons
          name={mapPrivacyNoticeToIcon(props.privacyType)}
          size={15}
          color={props.canEdit ? tw.color(`gray-500`) : tw.color(`gray-400`)}
        />
        {displayLong && (
          <Text style={tw`capitalize ml-1 font-thin`}>{props.privacyType}</Text>
        )}
      </View>
      {props.canEdit && (
        <Popover
          visible={modifying}
          anchor={() => (
            <TouchableOpacity
              onPress={() => {
                props?.onBlur && props.onBlur()
                toggleModifying()
              }}
            >
              <Ionicons
                name="chevron-down-outline"
                size={15}
                color={tw.color(`gray-500`)}
              />
            </TouchableOpacity>
          )}
          onBackdropPress={toggleModifying}
          backdropStyle={tw`bg-black/2`}
        >
          <Layout style={tw`bg-white p-5`}>
            <>
              {isEditing ? (
                <ActivityIndicator animating={true} />
              ) : (
                <>
                  {notices
                    .filter((notice) => notice !== props.privacyType)
                    .map((notice, idx) => (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            props.onEdit!(notice)
                            toggleModifying()
                          }}
                          style={tw`flex flex-row items-center px-1`}
                        >
                          <Ionicons
                            name={mapPrivacyNoticeToIcon(notice)}
                            size={15}
                            color={tw.color(`gray-500`)}
                            style={tw`mr-1 text-thin`}
                          />
                          <Text style={tw`text-thin capitalize `}>
                            {notice}
                          </Text>
                        </TouchableOpacity>
                        {idx < notices.length - 2 && <Separator />}
                      </>
                    ))}
                </>
              )}
            </>
          </Layout>
        </Popover>
      )}
    </View>
  )
}

const mapPrivacyNoticeToIcon = (notice: Notice): IconNotice => {
  const icons: IconNotice[] = ['link', 'cloud', 'globe-outline']
  const index = notices.findIndex((item) => item === notice)
  return icons[index]
}

export default PrivacyNotice
