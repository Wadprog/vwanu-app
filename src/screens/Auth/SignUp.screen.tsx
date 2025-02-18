import React from 'react'
import { View } from 'react-native'
import { string, ref, bool, object } from 'yup'

// Core components
import tw from 'lib/tailwind'
import Text from 'components/Text'
import Link from 'components/Link'
import routes from 'navigation/routes'
import PageWrapper from 'components/PageWrapper'
import { Form, Field, Submit, Switch } from 'components/form'
import { signUpUser } from 'store/auth-slice'
import { useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'store'
import { useDispatch } from 'react-redux'

const ValidationSchema = object().shape({
  email: string().email().required().label('Email'),
  password: string().required().min(8).label('Password'),
  lastName: string().required().label('Last Name'),
  firstName: string().required().label('First Name'),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password'), ''], 'Passwords must be match'),
  // termOfUse: bool(),
  termOfUse: bool()
    .required()
    .oneOf([true], 'You must accept the terms of use and the policy privacy'),
})

const RegisterScreen: React.FC<{}> = () => {
  const { error, loading } = useSelector((state: RootState) => state.auth)
  console.log({ error })
  const dispatch = useDispatch<AppDispatch>()
  return (
    <PageWrapper
      title="Personal Information"
      subtitle="Please fill the following"
      pageNumber={0}
      loading={loading}
      error={error}
    >
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            termOfUse: false,
          }}
          onSubmit={async (values) => {
            dispatch(signUpUser(values))
          }}
          style={tw`flex-1 flex justify-between items-center`}
        >
          <View style={tw`mb-5 flex-1 items-stretch`}>
            <Field
              label="First Name"
              style={tw`mb-5 rounded-lg`}
              required={true}
              placeholder="First Name"
              name="firstName"
            />

            <Field
              label="Last Name"
              key="lastName"
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Last Name"
              name="lastName"
            />

            <Field
              label="Email"
              key="email"
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Email"
              name="email"
            />

            <Field
              label="Password"
              key="password"
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Password"
              name="password"
            />

            <Field
              label="Password Confirmation"
              key="passwordConfirmation"
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
            />

            <Switch
              name="termOfUse"
              value={false}
              accesoryRight={
                <View style={tw` ml-2 flex flex-row items-center`}>
                  <Text style={tw`text-black mr-1`}>I agree to the</Text>
                  <Link
                    text="Privacy terms"
                    to="privacy"
                    style={tw`text-secondary`}
                  />
                  <Text style={tw`text-black mx-1`}>and</Text>
                  <Link
                    text="Community guidelines"
                    to="privacy"
                    style={tw`text-secondary`}
                  />
                </View>
              }
            />

            <Submit title="Sign up" />
          </View>
        </Form>
        <View style={tw`h-[70px] bg-green-50 bg-opacity-0`}>
          <View style={tw`flex flex-row justify-center`}>
            <Text category="c1" appearance="hint" style={tw`text-black mr-1`}>
              Already have an account
            </Text>
            <Link text="Sign in here" to={routes.SIGN_IN} />
          </View>
        </View>
      </>
    </PageWrapper>
  )
}
export default RegisterScreen
