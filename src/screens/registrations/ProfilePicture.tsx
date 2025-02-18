import React from 'react'
import { View } from 'react-native'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Custom dependencies
import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Button from '../../components/Button'
import PageWrapper from '../../components/PageWrapper'
import { Form, Submit, ImageField } from '../../components/form'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
  useFetchProfileQuery,
  useUpdateProfileMutation,
} from '../../store/profiles'

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

const ProfilePictureForm: React.FC<{}> = () => {
  const { userId } = useSelector((state: RootState) => state.auth)
  const { data: profile } = useFetchProfileQuery(userId!)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const loading = false

  return (
    <PageWrapper
      title="Personal Information"
      subtitle="Please fill the following"
      pageNumber={3}
      loading={loading}
    >
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={async (val) => {
            if (val.profilePicture)
              updateProfile({
                id: userId!,
                data: {
                  ...profile,
                  profilePicture: val.profilePicture,
                  nextCompletionStep: 4,
                },
              })
            else {
              updateProfile({
                id: userId!,
                data: {
                  profilePicture: `https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}`,
                  nextCompletionStep: 4,
                },
              })
            }
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
                onPress={async () => {
                  updateProfile({
                    id: userId!,
                    data: {
                      profilePicture: `https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}`,
                      nextCompletionStep: 4,
                    },
                  })
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
