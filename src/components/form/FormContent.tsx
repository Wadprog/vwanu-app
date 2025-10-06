import React from 'react'
import { ScrollView } from 'react-native'
import tw from 'lib/tailwind'

interface FormContentProps {
  children: React.ReactNode
}

const FormContent = ({ children }: FormContentProps) => {
  return (
    <ScrollView
      style={tw`flex-1`}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  )
}

export default FormContent
