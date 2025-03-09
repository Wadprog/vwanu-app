import React from 'react'
import { View } from 'react-native'
import { string, object } from 'yup'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import Link from 'components/Link'
import routes from 'navigation/routes'
import PageWrapper from 'components/PageWrapper'
import { Form, Field, Submit } from 'components/form'
import { forgotPassword } from 'store/auth-slice'
import { useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'store'

const ValidationSchema = object().shape({
  email: string().required().min(6).email().label('Email'),
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
      {/* <View
        style={tw`flex flex-row items-center justify-center mb-4 rounded-lg p-4`}
      >
        <Ionicons
          name="finger-print-outline"
          size={24}
          color="black"
          style={tw` border border-gray-300 p-4 rounded-2xl`}
        />
      </View> */}
      <Form
        validationSchema={ValidationSchema}
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          dispatch(forgotPassword(values.email))
          // @ts-ignore
        }}
      >
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          // type="email"
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
            Do not have an account
          </Text>
          <Link text="Create one" to={routes.SIGN_UP} />
        </View>
      </View>
    </PageWrapper>
  )
}
export default ForgotPasswordScreen
