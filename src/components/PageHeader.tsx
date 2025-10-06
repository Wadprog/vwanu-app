import React from 'react'
import AppCloseBtn from 'components/AppCloseBtn'
import Text from 'components/Text'
import Submit from 'components/form/Submit'
import { View } from 'react-native'
import tw from 'lib/tailwind'

interface FormHeaderProps {
  title?: string
  onClose: () => void
  isLoading?: boolean
  submitTitle?: string
  submittingText?: string
}

const FormHeader = ({
  title,
  onClose,
  isLoading,
  submitTitle,
  submittingText,
}: FormHeaderProps) => {
  const sumitting = submittingText || 'Creating...'
  const idleText = submitTitle || 'Create'
  return (
    <View
      style={tw`flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100`}
    >
      <AppCloseBtn onPress={() => onClose()} />

      {title && (
        <Text category="h6" style={tw`font-semibold text-lg `}>
          {title}
        </Text>
      )}

      <Submit
        title={isLoading ? sumitting : idleText}
        size="small"
        disabled={isLoading}
        style={tw`px-4 py-2 rounded-full`}
      />
    </View>
  )
}
export default FormHeader
