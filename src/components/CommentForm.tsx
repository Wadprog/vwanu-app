import React from 'react'

import { View } from 'react-native'
import { number, string, object, mixed, InferType } from 'yup'

import tw from 'lib/tailwind'
import { Notice } from '../../types'
import { Form, Field, Submit } from './form'
import { useCreateCommentMutation } from 'store/post'

const validationSchema = object().shape({
  postText: string().required().label('Comment'),
  postId: number().required('Post Id is required'),
  privacyType: mixed<Notice>().required().label('Privacy Type'),
})

interface CommentFormProps {
  postId: string
  afterSubmit?: () => void
}

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [formValues] = React.useState<InferType<typeof validationSchema>>({
    postText: '',
    postId: +props.postId,
    privacyType: 'public',
  })
  const [createComment, commentResult] = useCreateCommentMutation()

  return (
    <View style={tw`bg0-red-500 w-full`}>
      <Form
        validationSchema={validationSchema}
        initialValues={formValues}
        onSubmit={async (values) => {
          console.log('values', values)
          await createComment(values)
          console.log('done creating comment')
          props.afterSubmit && props.afterSubmit()
        }}
        style={tw` h-full flex flex-col justify-between py-5 pb-10  `}
      >
        <Field
          multiline
          label="Comment"
          name="postText"
          numberOfLines={10}
          style={tw`rounded h-30`}
          placeholder="Comment on this post"
        />

        <Submit title="submit" />
      </Form>
    </View>
  )
}

export default CommentForm
