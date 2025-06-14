import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { string, object } from 'yup'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import { useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'store'
import PageWrapper from 'components/PageWrapper'
import { forgotPassword } from 'store/auth-slice'
import { Form, Field, Submit } from 'components/form'
import { NextActions, setNextAction } from 'store/auth-slice'

const ValidationSchema = object().shape({
  email: string().required().email().label('Email'),
})

const ForgotPasswordScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useSelector((state: RootState) => state.auth)

  return (
    <PageWrapper
      title="Forgot Password"
      subtitle="No worries, we got you covered"
      loading={loading}
      error={error}
      style={tw`justify-start`}
    >
      <Form
        validationSchema={ValidationSchema}
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          dispatch(forgotPassword(values.email))
        }}
      >
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          keyboardType="email-address"
          autoComplete="email"
          style={tw`mb-5 rounded-lg`}
          iconRight={
            <Ionicons
              name="mail-outline"
              size={15}
              color={tw.color('text-gray-500')}
            />
          }
        />

        <Submit title="Submit" />
      </Form>
      <View style={tw`h-[70px] bg-green-50 bg-opacity-0`}>
        <View style={tw`flex flex-row justify-center`}>
          <Text category="c1" appearance="hint" style={tw`text-black mr-2`}>
            Remember your password?
          </Text>

          <TouchableOpacity
            style={tw`items-end`}
            onPress={() => {
              dispatch(setNextAction(NextActions.SIGNED_IN))
            }}
          >
            <Text category="c1" appearance="hint" style={tw`text-blue-500`}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageWrapper>
  )
}
export default ForgotPasswordScreen
