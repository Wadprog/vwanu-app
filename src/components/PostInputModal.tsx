import React from 'react'
import { string, object } from 'yup'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { formatDistanceToNow } from 'date-fns'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native'

import tw from '../lib/tailwind'
import ProfAvatar from './ProfAvatar'
import { getCurrentUser } from '../store/auth'
import { Field, Form, Submit, ImageField, PrivacyNoticeField } from './form'

interface PostInputModalInterface {
  visible: boolean
  openBottomSheet: boolean
  onClose?: () => void
}

const ValidationSchema = object().shape({
  postText: string().label('Post Text'),
  privacyType: string().label('Privacy Type'),
})

const initialValues = {
  postText: '',
  privacyType: 'public',
}

const shadowStyle = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
}

const PostInputModal: React.FC<PostInputModalInterface> = ({
  visible,
  onClose,
  openBottomSheet,
}) => {
  const user = useSelector(getCurrentUser)
  const bottomSheetRef = React.useRef<BottomSheet>(null)
  const snapPoints = React.useMemo(() => [40, 100], [])
  const iniTialsnapPointIndex = openBottomSheet ? 1 : 0

  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values)
          handleClose()
        }}
        style={tw`flex-1`}
      >
        {/* Header Section */}
        <View style={tw`mt-15 flex-1`}>
          <View
            style={tw`bg-slate-300 flex flex-row justify-between items-center p-2`}
          >
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close-outline" size={24} />
            </TouchableOpacity>
            <Text style={tw`font-extrabold`}>Create Post</Text>
            <Submit title="Post" />
          </View>

          {/* User + Privacy */}
          <View style={tw`flex flex-row items-center p-2`}>
            <ProfAvatar
              source={
                user?.profile?.profilePicture ||
                `https://ui-avatars.com/api/?name=${user.profile.firstName}+${user.profile.lastName}`
              }
              size={50}
              name={`${user.profile.firstName} ${user.profile.lastName}`}
              subtitle={formatDistanceToNow(new Date(user.profile.createdAt), {
                addSuffix: true,
              })}
            />
            <View style={tw`ml-2 self-end`}>
              <PrivacyNoticeField
                displayLong
                name="privacyType"
                canEdit={true}
                isEditing={false}
              />
            </View>
          </View>

          {/* Main text input */}
          <Field
            name="postText"
            placeholder="What is on your mind"
            required
            autoCapitalize="sentences"
            style={tw`h-1/2 border-0 bg-white/20 p-2`}
          />
        </View>

        {/* BOTTOM SHEET for Add Media */}
        {/*@ts-ignore */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={iniTialsnapPointIndex} // Start at the first snap point (collapsed)
          enablePanDownToClose={false} // Disallow closing by dragging downward
          style={[tw`rounded-t-xl self-end`, shadowStyle]}
          handleIndicatorStyle={tw`bg-gray-400 w-[30px] h-1 rounded`}
        >
          {/*@ts-ignore */}
          <BottomSheetView style={tw`flex-1 p-3`}>
            <Text style={tw`text-center text-lg font-bold mb-2`}>
              Add Media
            </Text>
            <View style={tw`h-[1px] bg-gray-500 rounded mb-5`} />
            <ImageField name="medias" />
          </BottomSheetView>
        </BottomSheet>
      </Form>
    </Modal>
  )
}

export default PostInputModal
