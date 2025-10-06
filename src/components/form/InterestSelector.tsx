import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import SelectMultiple from './SelectMultiple'
import { useFetchInterestsQuery } from '../../store/interests'

interface Props {
  required: boolean
  Label: string
  showCount: boolean
  maxSelected: number
  name: string
}

const InterestPill = ({
  label,
  value,
  isSelected,
}: {
  label: string
  value: string
  isSelected: boolean
}) => {
  return (
    <View
      style={tw`flex-row flex-wrapn p-2 rounded-full bg-${
        isSelected ? 'blue' : 'gray'
      }-200 mr-2 mb-2 text-center items-center justify-center`}
      key={value}
    >
      {isSelected ? (
        <Text style={tw`text-blue-700 font-medium text-sm`}>{label}</Text>
      ) : (
        <Text style={tw`text-gray-700 font-medium text-sm`}>{label}</Text>
      )}
    </View>
  )
}
const InterestSelector: React.FC<Props> = ({
  required,
  Label,
  showCount,
  maxSelected,
  name,
}) => {
  const [selectedInterestsCount, setSelectedInterestsCount] = useState(0)
  const { data: interests, isFetching: interestFetching } =
    useFetchInterestsQuery()

  if (interestFetching) {
    return (
      <View style={tw`flex-row justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <View style={tw``}>
      <View style={tw`flex-row justify-between items-center`}>
        {Label && (
          <Text category="h6" style={tw`font-semibold text-lg`}>
            {Label}
            {required ? ' *' : ''}
          </Text>
        )}
        {showCount && (
          <Text style={tw`text-gray-500 text-sm`}>
            {selectedInterestsCount}/5 selected
          </Text>
        )}
      </View>
      <SelectMultiple
        name={name}
        items={
          interests?.map(({ name, id }) => ({
            label: name,
            value: id.toString(),
          })) || []
        }
        IdleComponent={({ label, value }) => (
          <InterestPill label={label} value={value} isSelected={false} />
        )}
        SelectedComponent={({ label, value }) => (
          <InterestPill label={label} value={value} isSelected={true} />
        )}
        wrapperStyle={tw`flex-row flex-wrap`}
        maxSelected={maxSelected}
        required
        selectedItemsCount={setSelectedInterestsCount}
      />
    </View>
  )
}

export default InterestSelector
