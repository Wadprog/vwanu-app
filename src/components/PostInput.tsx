import { View, ActivityIndicator, useWindowDimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { string, object } from 'yup'
import { useFormikContext } from 'formik'
import { Avatar } from 'react-native-paper'

import tw from '../lib/tailwind'
import Img from '../assets/svg/Image'
import { Form, Field, Submit } from './form'
import { getCurrentUser } from '../store/auth'
import VerticalIcons from '../assets/svg/Vertical'
import Modal from './Modal'
import { Text } from 'react-native-paper'

const ValidationSchema = object().shape({
  postText: string().required('Post is required'),
})

import { useCreatePostMutation } from '../store/post'

const PostInput = () => {
  const { width } = useWindowDimensions()

  const user = useSelector(getCurrentUser)
  const [createPost, result] = useCreatePostMutation()
  const [input, setInput] = React.useState<number>(width - 200)

  const ref = React.useRef<View>(null)

  const handleWidth = (w: number) => {
    console.log({ w })
    setInput(width - w - 20)
  }

  React.useEffect(() => {
    console.log({ result })
  }, [result])

  return (
    <View style={tw`bg-red-500`}>
      <Form
        validationSchema={ValidationSchema}
        initialValues={{ postText: '' }}
        // @ts-ignore
        onSubmit={async (values) => {
          await createPost(values)
        }}
        style={[tw`bg-green-500`, { width: width / 2 }]}
      >
        <View style={tw`flex flex-row  my-2 bg-yellow-400`}>
          <Avatar.Image
            source={{
              uri:
                user?.profile?.profilePicture ||
                'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
            }}
            size={50}
            ref={ref}
            onLayout={(e) => handleWidth(e.nativeEvent.layout.width)}
          />

          <InPut
            width={248}
            disabled={result.isLoading}
            elementRight={result.isLoading && <ActivityIndicator />}
          />
        </View>
      </Form>
      {/* <Modal>
      <View style={tw`flex flex-row`}>
        <Text>Post Created</Text>
      </View>
    </Modal> */}
    </View>
  )
}

interface InPutProps {
  elementRight?: React.ReactNode
  disabled?: boolean
}
const InPut: React.FC<InPutProps> = ({ elementRight, ...rest }) => {
  const { handleSubmit } = useFormikContext()

  return (
    <Field
      name="postText"
      placeholder="What's on your mind?"
      style={tw`border-[#F2F3F5] border-[1px] bg-white ml-2 rounded-2xl mb-0 `}
      autoFocus
      iconRight={
        elementRight || (
          <View style={tw`flex flex-row`}>
            <Img />
            <VerticalIcons />
          </View>
        )
      }
      {...rest}
      onSubmitEditing={(e) => {
        handleSubmit()
      }}
    />
  )
}

export default PostInput
