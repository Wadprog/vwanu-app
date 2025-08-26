import React from 'react'
import * as Yup from 'yup'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import { RootState } from '../../store'

// Core components
import tw from '../../lib/tailwind'
import { Form, Submit } from '../../components/form'
import PageWrapper from '../../components/PageWrapper'
import Text from '../../components/Text'

import { useFetchInterestsQuery } from '../../store/interests'
import { useUpdateProfileMutation } from '../../store/profiles'

const ValidationSchema = Yup.object().shape({
  interests: Yup.array()
    .min(1, 'Please select at least one interest')
    .required()
    .label('Interests'),
})

const initialValues: Yup.InferType<typeof ValidationSchema> = {
  interests: [],
}

// Interest Selector Component
const InterestSelector: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<{ interests: string[] }>()
  const { data: interests = [], isFetching: interestFetching } =
    useFetchInterestsQuery()

  const selectedInterests = values.interests || []

  const handleInterestToggle = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId]

    setFieldValue('interests', newInterests)
  }

  const removeInterest = (interestId: string) => {
    const newInterests = selectedInterests.filter((id) => id !== interestId)
    setFieldValue('interests', newInterests)
  }

  return (
    <View style={tw`flex-1`}>
      {/* Bubble Grid for Available Interests */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>
          Available Interests
        </Text>
        {interestFetching ? (
          <View style={tw`flex-row justify-center py-8`}>
            <MaterialCommunityIcons name="loading" size={24} color="#666" />
            <Text style={tw`ml-2 text-gray-600`}>Loading interests...</Text>
          </View>
        ) : (
          <View style={tw`flex-row flex-wrap gap-3`}>
            {interests
              .filter((interest) => !selectedInterests.includes(interest.id))
              .map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  onPress={() => handleInterestToggle(interest.id)}
                  style={tw`bg-blue-100 border-2 border-blue-300 rounded-full px-4 py-3 shadow-sm`}
                >
                  <Text style={tw`text-blue-700 font-medium text-sm`}>
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </View>

      {/* Selected Interests */}
      {selectedInterests.length > 0 && (
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>
            Your Selected Interests ({selectedInterests.length})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`mb-4`}
          >
            <View style={tw`flex-row gap-3 px-1`}>
              {selectedInterests.map((interestId) => {
                const interest = interests.find((i) => i.id === interestId)
                return interest ? (
                  <View
                    key={interestId}
                    style={tw`bg-green-500 rounded-full px-4 py-3 flex-row items-center shadow-md min-w-max`}
                  >
                    <Text style={tw`text-white font-medium text-sm mr-2`}>
                      {interest.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeInterest(interestId)}
                      style={tw`bg-white bg-opacity-20 rounded-full p-1`}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={16}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const RegisterScreen: React.FC<{}> = () => {
  const { userId } = useSelector((state: RootState) => state.auth)

  const [
    updateProfile,
    { isLoading: isUpdating, error: updateError, data: updateData },
  ] = useUpdateProfileMutation()

  return (
    <PageWrapper
      title="What are your interests?"
      subtitle="Pick the things you love - tap the bubbles!"
      pageNumber={1}
      loading={isUpdating}
      error={updateError ? 'Failed to update profile' : null}
    >
      <View style={tw`flex-1`}>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log('Selected interests:', values.interests)
            if (userId) {
              await updateProfile({
                id: userId,
                data: {
                  interests: values.interests,
                  nextCompletionStep: 2,
                },
              })
            }
          }}
          style={tw`flex-1`}
        >
          <InterestSelector />

          {/* Continue Button */}
          <View style={tw`mt-auto pt-6`}>
            <Submit title="Continue" style={tw`w-full`} />
          </View>
        </Form>
      </View>
    </PageWrapper>
  )
}

// RegisterScreen.propTypes = {}
export default RegisterScreen
