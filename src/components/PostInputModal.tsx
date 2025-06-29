import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { string, object, mixed, InferType, array } from 'yup'
import { useSelector } from 'react-redux'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native'

import tw from 'lib/tailwind'
import ProfAvatar from './ProfAvatar'
import { Field, Form, Submit, ImageFields, PrivacyNoticeField } from './form'
import { useCreatePostMutation } from 'store/post'
import { Notice } from '../../types'
import { useFetchProfileQuery } from 'store/profiles'
import { RootState } from 'store'
import nameToPicture from 'lib/nameToPicture'
import { useFormikContext } from 'formik'
import routes from 'navigation/routes'

interface PostInputModalInterface {
  visible: boolean
  openBottomSheet: boolean
  onClose?: () => void
}

export interface PostInputModalHandle {
  focus: () => void
}

const ValidationSchema = object().shape({
  postText: string().label('Content'),
  privacyType: mixed<Notice>().required().label('Privacy Type'),
  postImage: array().of(string()).label('Images'),
})

const initialValues: InferType<typeof ValidationSchema> = {
  postText: '',
  privacyType: 'public',
  postImage: [],
}

const PostInputModal: React.FC<PostInputModalInterface> = ({
  visible,
  onClose,
  openBottomSheet,
}) => {
  const navigation = useNavigation()
  const { userId } = useSelector((state: RootState) => state.auth)
  const { data: user } = useFetchProfileQuery(userId!)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = React.useMemo(() => [40, 100], [])
  const iniTialsnapPointIndex = openBottomSheet ? 1 : 0
  const [createPost, result] = useCreatePostMutation()
  const [postText, setPostText] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const spinAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  // Spinning animation for loading icon
  React.useEffect(() => {
    if (result.isLoading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      )
      spinAnimation.start()
      return () => spinAnimation.stop()
    }
  }, [result.isLoading])

  // Handle post creation result
  React.useEffect(() => {
    if (result.isSuccess) {
      // Show success briefly, then close and navigate to feed
      setTimeout(() => {
        handleClose()
        // Navigate to the timeline/feed
        try {
          navigation.navigate(routes.TIMELINE as never)
        } catch (error) {
          console.log(
            'Navigation: Could not navigate to timeline, but post was created successfully'
          )
          // If navigation fails, at least the modal will close and the post was created
        }
      }, 1000)
    }
    if (result.isError) {
      console.error(result.error)
    }
  }, [result.isSuccess, result.isError, navigation])

  const handleClose = () => {
    if (onClose) onClose()
  }

  const isPostReady = postText.trim().length > 0

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

      <Animated.View
        style={[
          { flex: 1 },
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            //@ts-ignore
            await createPost(values)
            handleClose()
          }}
          style={styles.container}
        >
          {/* Enhanced Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Create Post</Text>

            <Submit
              title={result.isLoading ? 'Posting...' : 'Post'}
              size="small"
              disabled={!isPostReady || result.isLoading}
              style={[
                styles.postButton,
                isPostReady && styles.postButtonActive,
                result.isLoading && styles.postButtonLoading,
              ]}
              textStyle={[
                styles.postButtonText,
                isPostReady && styles.postButtonTextActive,
              ]}
            />
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Enhanced User Section */}
            <View style={styles.userSection}>
              <ProfAvatar
                source={
                  (typeof user?.profilePicture === 'object' &&
                    user?.profilePicture?.original) ||
                  (typeof user?.profilePicture === 'string'
                    ? user?.profilePicture
                    : '') ||
                  (user ? nameToPicture(user) : '')
                }
                size={50}
                name={`${user?.firstName} ${user?.lastName}`}
                subtitle="Share your thoughts with the community"
                subtitleParams={{
                  textStyles: 'text-gray-500 text-sm',
                }}
              />

              <PrivacyNoticeField
                displayLong
                name="privacyType"
                canEdit={true}
                isEditing={false}
              />
            </View>

            {/* Enhanced Text Input */}
            <View style={styles.textInputSection}>
              <CustomField
                //  ref={textInputRef}
                name="postText"
                placeholder="What's on your mind?"
                autoCapitalize="sentences"
                style={styles.textInput}
                multiline={true}
                onChangeText={setPostText}
                textAlignVertical="top"
              />

              {/* Character counter */}
              <View style={styles.characterCounter}>
                <Text
                  style={[
                    styles.counterText,
                    postText.length > 280 && styles.counterWarning,
                  ]}
                >
                  {postText.length}/500
                </Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => bottomSheetRef.current?.expand()}
              >
                <MaterialCommunityIcons
                  name="image-multiple"
                  size={20}
                  color="#6B7280"
                />
                <Text style={styles.actionText}>Add Media</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#6B7280"
                />
                <Text style={styles.actionText}>Location</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="account-group"
                  size={20}
                  color="#6B7280"
                />
                <Text style={styles.actionText}>Tag People</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Enhanced Bottom Sheet */}
          {/*@ts-ignore */}
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={iniTialsnapPointIndex}
            enablePanDownToClose={false}
            style={styles.bottomSheet}
            handleIndicatorStyle={styles.bottomSheetHandle}
            backgroundStyle={styles.bottomSheetBackground}
          >
            {/*@ts-ignore */}
            <BottomSheetView style={styles.bottomSheetContent}>
              <ImageFields name="postImage" />
            </BottomSheetView>
          </BottomSheet>
        </Form>

        {/* Loading Overlay */}
        {result.isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContent}>
              {result.isSuccess ? (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={40}
                  color="#10B981"
                  style={styles.loadingIcon}
                />
              ) : (
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: spinAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  }}
                >
                  <MaterialCommunityIcons
                    name="loading"
                    size={40}
                    color="#3B82F6"
                    style={styles.loadingIcon}
                  />
                </Animated.View>
              )}
              <Text style={styles.loadingText}>
                {result.isSuccess
                  ? 'Post created successfully!'
                  : 'Creating your post...'}
              </Text>
              <Text style={styles.loadingSubtext}>
                {result.isSuccess
                  ? 'Your post has been shared with the community'
                  : 'Please wait while we upload your content'}
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    </Modal>
  )
}
const CustomField = ({ onChangeText, ...props }: any) => {
  const { setFieldValue } = useFormikContext()
  return (
    <Field
      {...props}
      onChangeText={(e) => {
        setFieldValue(props.name, e)
        onChangeText(e)
      }}
    />
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#111827',
  },
  postButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
  },
  postButtonActive: {
    backgroundColor: '#3B82F6',
  },
  postButtonText: {
    color: '#9CA3AF',
    fontWeight: '600' as const,
    fontSize: 14,
  },
  postButtonTextActive: {
    color: '#FFFFFF',
  },
  postButtonLoading: {
    backgroundColor: '#9CA3AF',
    opacity: 0.7,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userSection: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
    gap: 10,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  privacySection: {
    marginLeft: 12,
    marginTop: 8,
  },
  textInputSection: {
    paddingVertical: 20,
    position: 'relative' as const,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    minHeight: 120,
    maxHeight: 200,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingBottom: 30,
  },
  characterCounter: {
    position: 'absolute' as const,
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500' as const,
  },
  counterWarning: {
    color: '#F59E0B',
  },
  quickActions: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500' as const,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomSheetHandle: {
    backgroundColor: '#D1D5DB',
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 12,
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#374151',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  loadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 1000,
  },
  loadingContent: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center' as const,
    lineHeight: 20,
  },
}

export default PostInputModal
