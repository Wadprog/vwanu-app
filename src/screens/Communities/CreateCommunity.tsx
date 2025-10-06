import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Text from 'components/Text'
import Screen from 'components/screen'
import tw from 'lib/tailwind'
import { CommunityStackParams, CommunityPrivacyType } from '../../../types'
import ImageUploadSection from '../../components/form/ImageUploadSection'
import InterestSelector from '../../components/form/InterestSelector'
import PrivacySettings from './components/PrivacySettings'
import { useCreateCommunityMutation } from '../../store/communities-api-slice'
import { Field, Form } from 'components/form'
import * as Yup from 'yup'
import FormHeader from 'components/form/FormHeader'
import FormContent from 'components/form/FormContent'
import { InferType } from 'yup'
import { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'

type NavigationProp = StackNavigationProp<
  CommunityStackParams,
  'CreateCommunity'
>

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  coverPicture: Yup.string().nullable(),
  interests: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please select at least one interest')
    .max(5, 'You can select up to 5 interests')
    .required('Interests are required'),
  // privacyType: Yup.string().required('Privacy Type is required'),
  // requireApproval: Yup.boolean().required('Require Approval is required'),
})

const CreateCommunity = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<NavigationProp>()

  const [createCommunity, { isLoading, error }] = useCreateCommunityMutation()
  // const {setFieldValue, values} = useFormikContext<InferType<typeof ValidationSchema>>()

  const initialValues: InferType<typeof ValidationSchema> = {
    name: `Community ${Math.random().toString(36).substring(2, 15)}`,
    description: `Describe your community... ${Math.random()
      .toString(36)
      .substring(2, 15)}`,
    coverPicture: '',
    interests: [],
    // privacyType: 'public',
    // requireApproval: false,
  }

  console.log('🚀 values:', createCommunity)
  return (
    <Screen loading={isLoading} error={error as any}>
      <View style={tw`flex-1 bg-gray-50 px-3`}>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          style={tw`flex-1`}
          onSubmit={(formData: any) => {
            createCommunity(formData)
              .unwrap()
              .then((createdCommunity: any) => {
                if (createdCommunity && createdCommunity.id) {
                  navigation.replace('CommunityDetail', {
                    communityId: createdCommunity.id,
                  })
                }
              })
              .catch((err: any) => {
                console.error('❌ Failed to create community:', err)
                console.error('Error details:', JSON.stringify(err, null, 2))
              })
          }}
        >
          <FormHeader
            onClose={() => navigation.goBack()}
            isLoading={isLoading}
            submitTitle="Create"
            submittingText="Creating..."
          />

          <FormContent>
            <ImageUploadSection name="coverPicture" />

            <Text category="h6" style={tw`font-semibold text-lg mb-4`}>
              Basic Information
            </Text>
            <Field
              name="name"
              placeholder="Enter community name"
              style={tw`bg-gray-50`}
              required
              label="Community Name"
            />

            <Field
              name="description"
              placeholder="Describe your community..."
              style={tw`bg-gray-50 text-base min-h-20`}
              required
              multiline
              numberOfLines={4}
              label="Description"
            />

            <InterestSelector
              name="interests"
              Label="Interests"
              showCount={true}
              maxSelected={5}
              required={true}
            />

            {/* <PrivacySettings
            privacyType={(values['privacyType'] || 'public') as CommunityPrivacyType}
            requireApproval={values['requireApproval'] || false}
            onPrivacyTypeChange={(privacyType) => setFieldValue('privacyType', privacyType)}
            onApprovalChange={(requireApproval) => setFieldValue('requireApproval', requireApproval)}
          /> */}

            {/* Bottom spacing */}
            <View style={tw`h-20`} />
          </FormContent>
        </Form>
      </View>
    </Screen>
  )
}

export default CreateCommunity
