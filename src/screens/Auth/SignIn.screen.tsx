import React from 'react'
import { string, object } from 'yup'
import { View, ImageBackground, TouchableOpacity, Image } from 'react-native'

import tw from 'lib/tailwind'
import images from 'config/image'
import Text from 'components/Text'
import Screen from 'components/screen'
import useToggle from 'hooks/useToggle'
import SignInSvg from 'assets/svg/SignIn'
import Icon from '@expo/vector-icons/Ionicons'
import { RootState, AppDispatch } from 'store'
import { Form, Field, Submit } from 'components/form'
import { useAuthActions } from 'hooks/useAuthActions'
import { useDispatch, useSelector } from 'react-redux'
import { NextActions, setNextAction } from 'store/auth-slice'

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
    <Screen loading={loading} error={error} safeArea={false}>
      <ImageBackground style={tw`px-5 pt-30 flex-1 flex`}>
        <View style={tw`flex-1 flex items-center mt-[2%] `}>
          <Image source={images.connectedPeople[2]} style={tw``} />
        </View>
        <View style={tw`flex bottom-0`}>
          <View style={tw`mb-9`}>
            <Text category="h6" style={tw`text-black mb-[7px] w-1/2`}>
              Sign in to your account
            </Text>
            <Text category="p1" style={tw`text-black w-3/4`}>
              Start curating your network
            </Text>
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

            <View style={tw`mt-10 mb-2`}>
              <Submit title="Login" />
            </View>
          </Form>
          <View style={tw`h-[70px] bg-green-500 bg-opacity-0`}>
            <View style={tw`flex flex-row justify-center`}>
              <Text category="c1" appearance="hint" style={tw`text-black mr-2`}>
                Do not have an account
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setNextAction(NextActions.SIGNED_UP))
                }}
              >
                <Text category="c1" appearance="hint" style={tw`text-blue-500`}>
                  Create an account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  )
}
export default LoginScreen
