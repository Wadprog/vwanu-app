import React from 'react'
import { View } from 'react-native'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Custom dependencies
import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { updateUser } from '../../store/auth'
import PageWrapper from './components/PageWrapper'
import { Form, Submit, ImageField } from '../../components/form'

const ValidationSchema = Yup.object().shape({
  profilePicture: Yup.string().required().label('Profile Picture').nullable(),
})

const initialValues = {
  profilePicture: null,
}

const IconWithArrow: React.FC<{}> = () => (
  <MaterialCommunityIcons
    name="chevron-right"
    size={24}
    color={tw.color('text-primary font-bold')}
    style={tw`-ml-4`}
  />
)

const ProfilePictureForm: React.FC<{ profilePicture: string }> = (props) => {
  const dispatch = useDispatch()
  const navigator = useNavigation()

  return (
    <PageWrapper
      title="Personal Information"
      subtitle="Please fill the following"
      pageNumber={3}
    >
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          // @ts-ignore
          onSubmit={(val) => {
            // @ts-ignore
            dispatch(updateUser(val))
          }}
          style={tw`flex-1 flex justify-between`}
        >
          <View style={tw` flex items-center`}>
            <ImageField name="profilePicture" style={tw`w-3/4 h-[70px]"/>`} />
            <View style={tw`mt-5`}>
              <Text style={tw`text-[#979292] text-lg text-center`}>
                Choose a profile picture
              </Text>
              <Text
                style={tw`text-[#979292] text-center text-lg w-[55%] text-wrap`}
              >
                A Profile picture helps you connect more
              </Text>
            </View>
          </View>
          <View>
            <View style={tw`flex flex-row justify-between`}>
              <Button
                title="Skip"
                appearance="ghost"
                style={tw`text-black`}
                textStyle={tw`text-black`}
                onPress={() => {
                  const profilePicture =
                    'https://ui-avatars.com/api/?name=John+Doe' // @ts-ignore
                  // @ts-ignore
                  dispatch(updateUser({ profilePicture }))
                  // @ts-ignore
                  navigator.navigate('find')
                }}
              />
              <Submit
                title="Register"
                // @ts-ignore
                accessoryRight={IconWithArrow}
                appearance="ghost"
                style={tw`text-black`}
                textStyle={tw`text-black`}
              />
            </View>
          </View>
        </Form>
      </>
    </PageWrapper>
  )
}

export default ProfilePictureForm
