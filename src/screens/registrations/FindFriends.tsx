import React from 'react'
import * as Yup from 'yup'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

// Core components
import tw from '../../lib/tailwind'
import Button from '../../components/Button'
import IconRight from './components/RightIcon'
import PageWrapper from '../../components/PageWrapper'
import {
  useFetchProfilesQuery,
  useFetchProfileQuery,
} from '../../store/profiles'
import { useUpdateProfileMutation } from '../../store/profiles'
import { Form, MultiImageSelector, Submit } from '../../components/form'

const initialValues = {
  users: [],
}
const ValidationSchema = Yup.object().shape({
  users: Yup.array().required().label('users'),
})

const FindFriends: React.FC<{}> = () => {
  const { data: users, isFetching } = useFetchProfilesQuery()
  const { userId } = useSelector((state: RootState) => state.auth)
  const { data: profile } = useFetchProfileQuery(userId!)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  return (
    <PageWrapper
      title="Connect with new people"
      subtitle="Find your friend and connect"
      pageNumber={2}
    >
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log('values', values)
            if (userId) {
              await updateProfile({
                id: userId,
                data: {
                  ...profile,
                  friends: values.users,
                  nextCompletionStep: 3,
                },
              })
            }
          }}
          style={tw`flex-1 flex justify-between items-center`}
        >
          <View />
          <View style={tw`flex-1`}>
            <MultiImageSelector
              items={users}
              name="users"
              isLoading={isFetching}
            />
          </View>
          <View style={tw`flex flex-row justify-between h-[50px]`}>
            <Button
              title="Skip"
              appearance="ghost"
              style={tw`text-black`}
              textStyle={tw`text-black`}
            />
            <Submit
              title="Register"
              // @ts-ignore
              accessoryRight={IconRight}
              appearance="ghost"
              style={tw`text-black`}
              textStyle={tw`text-black`}
            />
          </View>
        </Form>
      </>
    </PageWrapper>
  )
}
export default FindFriends
