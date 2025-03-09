import React, { useState } from 'react'
import { View, TextInput, ImageBackground } from 'react-native'
import { Text } from '@ui-kitten/components'
import tw from '../../lib/tailwind'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import Button from 'components/Button'
import Screen from 'components/screen'
import images from 'config/image'
import { AppDispatch } from 'store'
import { useAuthActions } from 'hooks/useAuthActions'

const ConfirmSignUpScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { error, loading, username } = useSelector(
    (state: RootState) => state.auth
  )
  const { confirmSignUpUserWithMessage, resendPasscodeWithMessage } =
    useAuthActions()

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
    dispatch(resendPasscodeWithMessage(username ?? ''))
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
    <Screen loading={loading} error={error}>
      <ImageBackground
        style={tw`px-5  pt-10 flex-1 flex`}
        source={images.registerBg}
      >
        <View style={tw` mb-4`}>
          <Text category="h6" style={tw`text-black mb-[7px] w-1/2`}>
            Almost there!
          </Text>

          <Text category="p1">
            Please enter the 6-digit code sent to your email{' '}
            <Text style={tw`text-secondary`}>{username!}</Text> for
            verification.
          </Text>
        </View>

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

        <Button
          title="Submit"
          onPress={() => {
            const otpString = otp.join('')
            // Handle OTP submission here
            console.log('OTP:', otpString)
            dispatch(
              confirmSignUpUserWithMessage({
                email: username ?? '',
                code: otpString,
              })
            )
          }}
        />

        <View style={tw`mt-4 items-center`}>
          <Text category="p2" style={tw`text-gray-500`}>
            Didn't receive the code?{' '}
            {countdown > 0 ? (
              <Text style={tw`text-gray-500`}>
                Request new code in {countdown}s
              </Text>
            ) : (
              <Text style={tw`text-secondary`} onPress={handleResendCode}>
                Resend Code
              </Text>
            )}
          </Text>
        </View>
      </ImageBackground>
    </Screen>
  )
}
export default ConfirmSignUpScreen
