import React from 'react'
import { View, Image } from 'react-native'
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
import AvatarGroup from 'components/AvatarGroups'
import image from '../../config/image'
import { User } from '../../../types.d'

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
    color="white"
    style={tw`-ml-4`}
  />
)

const ProfilePictureForm: React.FC<{}> = () => {
  const { userId } = useSelector((state: RootState) => state.auth)
  const { data: profile } = useFetchProfileQuery(userId!)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const loading = false

  return (
    <PageWrapper title="" subtitle="" pageNumber={3} loading={loading}>
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={async (val) => {
            if (val.profilePicture)
              updateProfile({
                id: userId!,
                data: {
                  // ...profile,
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
          style={tw`flex-1 flex justify-between mt-10`}
        >
          <View style={tw` flex items-center mt-10`}>
            <View style={tw`mt-5`}>
              <View style={tw`flex-col items-center`}>
                <AvatarGroup
                  size={50}
                  avatars={[
                    {
                      firstName: 'John',
                      lastName: 'Doe',
                      profilePicture:
                        'https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=ffffff',
                    } as User,
                    {
                      firstName: 'Jane',
                      lastName: 'Smith',
                      profilePicture:
                        'https://ui-avatars.com/api/?name=Jane+Smith&background=EC4899&color=ffffff',
                    } as User,
                    {
                      firstName: 'Mike',
                      lastName: 'Johnson',
                      profilePicture:
                        'https://ui-avatars.com/api/?name=Mike+Johnson&background=10B981&color=ffffff',
                    } as User,
                    {
                      firstName: 'Sarah',
                      lastName: 'Wilson',
                      profilePicture:
                        'https://ui-avatars.com/api/?name=Sarah+Wilson&background=F59E0B&color=ffffff',
                    } as User,
                    {
                      firstName: 'Alex',
                      lastName: 'Brown',
                      profilePicture:
                        'https://ui-avatars.com/api/?name=Alex+Brown&background=8B5CF6&color=ffffff',
                    } as User,
                    {
                      firstName: 'Emma',
                      lastName: 'Davis',
                      profilePicture:
                        'https://ui-avatars.com/api/?name=Emma+Davis&background=EF4444&color=ffffff',
                    } as User,
                  ]}
                />
                <Text
                  style={tw`text-blue-600 text-xl text-center mt-5 font-extrabold tracking-wide`}
                >
                  ✨ We love a great looking profile picture ✨
                </Text>
                <Text
                  style={tw`text-blue-500 text-lg text-center mb-5 font-bold tracking-wide`}
                >
                  Let's make or choose one
                </Text>
                <ImageField
                  InitialImage={
                    <Image
                      source={image.appIcon}
                      style={tw`w-40 h-40 rounded-full`}
                    />
                  }
                  name="profilePicture"
                  style={tw`w-60 h-60 rounded-full`}
                />
                <View
                  style={tw`mt-2 mb-2 flex justify-center items-center w-full `}
                >
                  <Image
                    source={image.connectedPeople[4]}
                    style={[
                      tw`w-30 h-30`,
                      { transform: [{ rotate: '-180deg' }] },
                    ]}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={tw`mt-2`}>
                <Text style={tw`text-[#979292] text-lg text-center`}>
                  Choose a profile picture
                </Text>
              </View>
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
                appearance="filled"
                style={tw`bg-primary flex-1 w-full`}
                textStyle={tw`text-white font-bold`}
              />
            </View>
          </View>
        </Form>
      </>
    </PageWrapper>
  )
}

export default ProfilePictureForm
