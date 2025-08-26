import React from 'react'
import { View } from 'react-native'
import { string, object } from 'yup'

import tw from 'lib/tailwind'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'store'
import { useAuthActions } from 'hooks/useAuthActions'
import { Form, DateInput, Submit, Field, LocationInput } from 'components/form'

const ValidationSchema = object().shape({
  birthdate: string().required().label('Date of Birth'),
  location: string().label('Location'),
})

const RegisterScreen: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { setBirthdateWithMessage } = useAuthActions()
  const { error, loading } = useSelector((state: RootState) => state.auth)

  return (
    <Form
      validationSchema={ValidationSchema}
      initialValues={{
        birthdate: '1990-01-01',
        location: '',
      }}
      onSubmit={async (values) => {
        const submitData = {
          birthdate: values.birthdate,
          location: values.location || '', // Provide empty string if location is undefined
        }
        const thunk = setBirthdateWithMessage(submitData)
        await dispatch(thunk)
      }}
      style={tw`justify-between items-center mb-5`}
    >
      <View style={tw`mb-5 items-stretch w-full`}>
        <DateInput
          label="Date of Birth"
          style={tw` rounded mb-1 `}
          // @ts-ignore
          placeholder="Date of Birth"
          name="birthdate"
          type="text"
          autoComplete="new-email"
        />

        <LocationInput
          label="Location (Optional)"
          placeholder="Start typing your address (optional)..."
          name="location"
          maxResults={5}
          language="en"
        />
      </View>
      <Submit title="Next" style={tw`  w-full`} />
    </Form>
  )
}
export default RegisterScreen
