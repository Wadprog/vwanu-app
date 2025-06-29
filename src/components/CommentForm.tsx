import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { string, object, mixed, InferType } from 'yup'
import {
  View,
  Platform,
  Keyboard,
  Animated,
  StyleSheet,
  TextInput,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import tw from 'lib/tailwind'
import { Notice } from '../../types'
import { Form, Field, Submit } from './form'
import { useCreateCommentMutation } from 'store/post'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const validationSchema = object().shape({
  postText: string().required().label('Comment'),
  postId: string().required('Post Id is required'),
  privacyType: mixed<Notice>().required().label('Privacy Type'),
})

type FormValues = InferType<typeof validationSchema>

interface CommentFormProps {
  postId: string
  onSubmit?: () => void
  isCommenting?: boolean
  off?: number
}

export type CommentFormHandle = {
  focus: () => void
}

const CommentForm = forwardRef<CommentFormHandle, CommentFormProps>(
  ({ postId, onSubmit, isCommenting, off = 40 }, ref) => {
    const insets = useSafeAreaInsets()
    const [formValues] = React.useState<FormValues>({
      postText: '',
      postId: postId,
      privacyType: 'public',
    })
    const [createComment] = useCreateCommentMutation()
    const translateY = React.useRef(new Animated.Value(0)).current
    const inputRef = useRef<TextInput>(null)

    React.useEffect(() => {
      const keyboardWillShow = (event: any) => {
        const keyboardHeight = event.endCoordinates.height
        const offset = Platform.OS === 'ios' ? 0 : insets.bottom
        Animated.timing(translateY, {
          toValue: -keyboardHeight + off,
          duration: event.duration,
          useNativeDriver: true,
        }).start()
      }

      const keyboardWillHide = (event: any) => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: event.duration,
          useNativeDriver: true,
        }).start()
      }

      const showSubscription = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        keyboardWillShow
      )
      const hideSubscription = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        keyboardWillHide
      )

      return () => {
        showSubscription.remove()
        hideSubscription.remove()
      }
    }, [insets.bottom])

    const handleSubmit = async (values: any, { resetForm }: any) => {
      try {
        await createComment(values)
        onSubmit?.()
        resetForm()
        Keyboard.dismiss()
      } catch (error) {
        console.error('Error submitting comment:', error)
      }
    }

    useImperativeHandle(ref, () => ({
      focus: () => {
        console.log('CommentForm focus called, inputRef:', inputRef.current)
        if (inputRef.current) {
          console.log('Attempting to focus TextInput...')
          inputRef.current.focus()
          console.log('Focus called on TextInput')
        } else {
          console.log('inputRef.current is null/undefined')
        }
      },
    }))

    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <Form
          validationSchema={validationSchema}
          initialValues={formValues}
          onSubmit={handleSubmit}
          style={tw`w-full bg-white border-t border-gray-200`}
        >
          <View style={tw`flex-row items-center w-full px-1`}>
            <View style={tw`flex-1 py-4`}>
              <Field
                ref={inputRef}
                multiline
                name="postText"
                style={tw`rounded-2xl p-2 flex-1 bg-gray-50`}
                placeholder="Comment on this post"
              />
            </View>
            <Submit
              appearance="ghost"
              accessoryRight={() => (
                <MaterialCommunityIcons
                  name="send"
                  size={15}
                  color={tw.color('primary')}
                  style={{ transform: [{ rotate: '-15deg' }] }}
                />
              )}
              size="small"
              style={tw`w-8 h-8 justify-center items-center p-0 ml-2`}
              textStyle={tw`p-0 m-0`}
            />
          </View>
        </Form>
      </Animated.View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
})

export default CommentForm
