import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { string, ref, bool, object } from 'yup'
import Icon from '@expo/vector-icons/Ionicons'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import Link from 'components/Link'
import useToggle from 'hooks/useToggle'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'store'
import PageWrapper from 'components/PageWrapper'
import { useAuthActions } from 'hooks/useAuthActions'
import { Form, Field, Submit, Switch } from 'components/form'
import { NextActions, setNextAction } from 'store/auth-slice'
const ValidationSchema = object().shape({
  email: string().email().required().label('Email'),
  password: string().required().min(8).label('Password'),
  lastName: string().required().label('Last Name'),
  firstName: string().required().label('First Name'),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password'), ''], 'Passwords must be match'),
  termOfUse: bool()
    .required()
    .oneOf([true], 'You must accept the terms of use and the policy privacy'),
})

const RegisterScreen: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { signUpUserWithMessage } = useAuthActions()
  const [showPassword, toggleShowPassword] = useToggle(false)
  const { error, loading } = useSelector((state: RootState) => state.auth)

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
            dispatch(signUpUserWithMessage(values))
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
              secureTextEntry={!showPassword}
              placeholder="Password"
              name="password"
              iconRight={
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    color={tw.color('gray-500')}
                  />
                </TouchableOpacity>
              }
            />

            <Field
              label="Password Confirmation"
              key="passwordConfirmation"
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              secureTextEntry={!showPassword}
              iconRight={
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    color={tw.color('gray-500')}
                  />
                </TouchableOpacity>
              }
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
            <TouchableOpacity
              onPress={() => {
                dispatch(setNextAction(NextActions.SIGNED_IN))
              }}
            >
              <Text category="c1" appearance="hint" style={tw`text-blue-500`}>
                Sign in here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </PageWrapper>
  )
}
export default RegisterScreen
