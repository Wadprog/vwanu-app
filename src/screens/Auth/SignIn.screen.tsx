import React from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { string, object } from 'yup'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import Link from 'components/Link'
import routes from 'navigation/routes'
import { Form, Field, Submit } from 'components/form'
import { NextActions, setNextAction } from 'store/auth-slice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'store'
import Icon from '@expo/vector-icons/Ionicons'
import useToggle from 'hooks/useToggle'
import SignInSvg from 'assets/svg/SignIn'
import Screen from 'components/screen'
import images from 'config/image'
import { useAuthActions } from 'hooks/useAuthActions'

const ValidationSchema = object().shape({
  password: string().required().min(8).label('Password'),
  email: string().required().min(6).email().label('Email'),
})

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useSelector((state: RootState) => state.auth)
  const [showPassword, toggleShowPassword] = useToggle(false)
  const { signInUserWithMessage: signInUser } = useAuthActions()
  return (
    <Screen loading={loading} error={error}>
      <ImageBackground
        style={tw`px-5 pt-30 flex-1 flex`}
        source={images.registerBg}
      >
        <View style={tw`items-center mb-6   relative`}>
          <SignInSvg />
          <View style={tw`absolute top-38`}>
            <Text category="h4" style={tw`text-center font-400 `}>
              Welcome Back
            </Text>
            <Text>Sign in and access your account</Text>
          </View>
        </View>

        <Form
          validationSchema={ValidationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            dispatch(signInUser(values))
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
              <Icon
                name="mail-outline"
                size={15}
                color={tw.color('text-gray-500')}
              />
            }
          />
          <Field
            required
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            name="password"
            secureTextEntry={!showPassword}
            style={tw`mb-5 rounded-lg`}
            iconRight={
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={15}
                color={tw.color('text-gray-500')}
              />
            }
            onIconRightPress={() => {
              console.log('toggleShowPassword')
              toggleShowPassword()
            }}
          />
          <TouchableOpacity
            style={tw`-mt-4 mb-4 items-end`}
            onPress={() => {
              dispatch(setNextAction(NextActions.FORGOT_PASSWORD))
            }}
          >
            <Text category="c1" appearance="hint" style={tw`text-blue-500`}>
              Forgot Password
            </Text>
          </TouchableOpacity>

          <View style={tw`mt-10`}>
            <Submit title="Login" />
          </View>
        </Form>
        <View style={tw`h-[70px] bg-green-500 bg-opacity-0`}>
          <View style={tw`flex flex-row justify-center`}>
            <Text category="c1" appearance="hint" style={tw`text-black mr-2`}>
              Do not have an account
            </Text>
            <Link text="Create one" to={routes.SIGN_UP} />
          </View>
        </View>
      </ImageBackground>
    </Screen>
  )
}
export default LoginScreen
