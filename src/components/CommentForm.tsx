import React, { useRef } from 'react'
import { string, object, mixed, InferType } from 'yup'
import { useFormikContext, FormikHelpers } from 'formik'

import tw from 'lib/tailwind'
import { Notice } from '../../types'
import { Form, Field } from './form'
import { useCreateCommentMutation } from 'store/post'

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
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onSubmit,
  isCommenting,
}) => {
  const [formValues] = React.useState<FormValues>({
    postText: '',
    postId: postId,
    privacyType: 'public',
  })
  const [createComment] = useCreateCommentMutation()

  const handleSubmit = async (values: any) => {
    try {
      await createComment(values)
      onSubmit?.()
    } catch (error) {
      console.error('Failed to submit comment:', error)
    }
  }

  const handleKeyPress = (e: any) => {
    const { key, shiftKey } = e.nativeEvent

    if (key === 'Enter' && !shiftKey) {
      e.preventDefault()

      // Get formik context and submit
      const form = e.target.form
      if (form) {
        console.log('form', form)
        form.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }
    }
  }

  return (
    <Form
      validationSchema={validationSchema}
      initialValues={formValues}
      onSubmit={handleSubmit}
      style={tw`h-ful`}
    >
      <Field
        multiline
        name="postText"
        style={tw`rounded-2xl m-0 p-2`}
        placeholder="Comment on this post"
        onKeyPress={(e) => handleKeyPress(e)}
      />
    </Form>
  )
}

export default CommentForm
