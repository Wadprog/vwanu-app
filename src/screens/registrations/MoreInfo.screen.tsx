import React from 'react'
import * as Yup from 'yup'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Core components
import tw from '../../lib/tailwind'
import {
  Form,
  Submit,
  DateInput,
  Select,
  MultiSelector,
} from '../../components/form'
import PageWrapper from '../../components/PageWrapper'

import {
  useFetchCountriesQuery,
  useFetchCityQuery,
  useFetchStatesQuery,
} from '../../store/add'

import { useFetchInterestsQuery } from '../../store/interests'
import useProfileContext from 'hooks/useProfileContext'

const ValidationSchema = Yup.object().shape({
  city: Yup.string().required().label('City'),
  country: Yup.string().required().label('Country'),
  interests: Yup.array().required().label('Interests'),
  state: Yup.string().required().label('State'),
  dob: Yup.date().required().label('Date of Birth'),
  gender: Yup.string().required().oneOf(['m', 'f']).label('Gender'),
})

const initialValues: Yup.InferType<typeof ValidationSchema> = {
  dob: new Date(),
  gender: 'm',
  state: '',
  country: '',
  city: '',
  interests: [],
}

const Icon = () => (
  <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
)

const genders = [
  {
    label: 'male',
    value: 'm',
  },

  {
    label: 'female',
    value: 'f',
  },
]

const RegisterScreen: React.FC<{}> = () => {
  const { loading, error, updateAddressGenderAndInterests } =
    useProfileContext()

  const [selectedCountry, setSelectedCountry] = React.useState(undefined)
  const [selectedState, setSelectedState] = React.useState(undefined)

  const {
    data: countries = [],
    isFetching,
    isLoading,
  } = useFetchCountriesQuery()
  const { data: interests = [], isFetching: interestFetching } =
    useFetchInterestsQuery()

  const { data: states = [], isFetching: stateFetching } = useFetchStatesQuery(
    selectedCountry || '',
    {
      skip: !selectedCountry,
    }
  )

  const { data: cities = [], isFetching: citiFetching } = useFetchCityQuery(
    selectedState || '',
    {
      skip: !selectedState,
    }
  )

  return (
    <PageWrapper
      title="More Personal Information"
      subtitle="Let's get to know you better"
      pageNumber={1}
      loading={loading}
      error={
        error
          ? {
              message: error.message,
              onDismiss: () => {},
            }
          : null
      }
    >
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={async (value) => {
            await updateAddressGenderAndInterests(value)
          }}
          style={tw`flex-1 flex`}
        >
          <View style={tw`mb-5 flex-1`}>
            <DateInput
              label="Date of Birth"
              style={tw`mb-5 rounded`}
              // @ts-ignore
              placeholder="Date of Birth"
              name="dob"
              type="text"
              autoComplete="new-email"
            />
            <Select
              label="Gender"
              items={genders}
              // @ts-ignore
              style={tw`mb-5 rounded`}
              required
              autoCapitalize="none"
              placeholder="Select your gender"
              name="gender"
              type="text"
              autoComplete="new-email"
              iconLeft={<Icon />}
            />
            <Select
              label="Country"
              isLoading={isFetching || isLoading}
              disabled={!countries.length}
              // @ts-ignore
              items={countries.map((country) => ({
                label: ` ${country.flag} ${country.name}`,
                value: country.id,
              }))}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Country"
              name="country"
              type="text"
              autoComplete="new-email"
              // @ts-ignore
              whenSelect={setSelectedCountry}
            />
            <Select
              label="State"
              // @ts-ignore
              items={states?.map((st) => ({
                label: st.name,
                value: st.id,
              }))}
              disabled={stateFetching || !states.length}
              isLoading={stateFetching}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="City"
              name="state"
              type="text"
              autoComplete="new-email"
              // @ts-ignore
              whenSelect={setSelectedState}
            />
            <Select
              label="City"
              // @ts-ignore
              items={cities?.map((ct) => ({
                label: ct.name,
                value: ct.id,
              }))}
              disabled={citiFetching || !cities.length}
              isLoading={citiFetching}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="City"
              name="city"
              type="text"
              autoComplete="new-email"
            />
            <MultiSelector
              label="Interests"
              // @ts-ignore
              isLoading={interestFetching}
              items={interests.map((interest) => ({
                label: interest.name,
                value: interest.id,
              }))}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Pick your interests"
              name="interests"
              type="text"
            />
            <Submit title="Register" />
          </View>
        </Form>
      </>
    </PageWrapper>
  )
}

// RegisterScreen.propTypes = {}
export default RegisterScreen
