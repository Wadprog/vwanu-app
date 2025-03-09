import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { string, object, ref } from 'yup'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Link from '../../components/Link'
import PageWrapper from '../../components/PageWrapper'
import { Form, Field, Submit } from '../../components/form'
import { RootState, AppDispatch } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import { NextActions, setNextAction } from 'store/auth-slice'
import { useAuthActions } from 'hooks/useAuthActions'

const ValidationSchema = object().shape({
  password: string().required().min(8).label('Password'),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password'), ''], 'Passwords must be match'),
})

const ResetPasswordScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { error, loading, username } = useSelector(
    (state: RootState) => state.auth
  )
  const { confirmResetPasswordWithMessage } = useAuthActions()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const inputRefs = Array(6)
    .fill(0)
    .map(() => React.createRef<TextInput>())

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (isTimerRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(timer)
  }, [countdown, isTimerRunning])

  const handleResendCode = () => {
    setCountdown(60)
    setIsTimerRunning(true)
  }

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) value = value[0] // Only take the first character
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current?.focus()
    }
  }

  return (
    <PageWrapper
      title="New Password"
      subtitle="Set the password"
      style={tw`justify-start`}
      loading={loading}
      error={error}
    >
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          passwordConfirmation: '',
          password: '',
        }}
        // @ts-ignore
        onSubmit={async (values) => {
          console.log(values)

          dispatch(
            confirmResetPasswordWithMessage({
              username: username || '',
              code: otp.join('') || '',
              newPassword: values.password || '',
            })
          )
        }}
      >
        <View style={tw`flex-row justify-between mb-5`}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                tw`w-12 h-12 border border-gray-300 rounded-lg text-center text-lg line-5 pb-2`,
                // Add focused state styling
                focusedIndex === index && tw`border-2 border-secondary`,
                // Add filled state styling
                digit !== '' && tw`border-2 border-primary`,
                // Center text vertically
                { textAlignVertical: 'center' },
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          ))}
        </View>

        <Field
          required
          autoCapitalize="none"
          placeholder="Password"
          name="password"
          style={tw`mb-5 rounded-lg`}
        />
        <Field
          required
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Confirm Password"
          name="passwordConfirmation"
          style={tw`mb-5 rounded-lg`}
        />

        <Submit title="ResetPassword" />
      </Form>

      <View style={tw`flex flex-row justify-center`}>
        <Text category="c1" appearance="hint" style={tw`text-black mr-2`}>
          Do not have an account
        </Text>
        <Link
          text="Create one"
          onPress={() => dispatch(setNextAction(NextActions.CONFIRMED_SIGNUP))}
        />
      </View>
    </PageWrapper>
  )
}
export default ResetPasswordScreen
