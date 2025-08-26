import React, { useState, useCallback, useEffect } from 'react'
import { useFormikContext } from 'formik'
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Text from '../Text'
import tw from 'lib/tailwind'
import FieldParams from './fieldParams'
import useToggle from 'hooks/useToggle'
import { useSearchLocationQuery, LocationSuggestion } from 'store/location'
import Error from './Error'

interface LocationInputProps extends FieldParams {
  placeholder?: string
  label?: string
  maxResults?: number
  language?: string
  countries?: string
}

const LocationInput: React.FC<LocationInputProps> = ({
  name,
  placeholder = 'Select location',
  maxResults = 5,
  language = 'en',
  countries,
}) => {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<any>()
  const [modalVisible, toggleModalVisible] = useToggle(false)
  const [searchText, setSearchText] = useState('')
  const [debouncedText, setDebouncedText] = useState('')

  const selectedValue = values[name] || ''
  const screenHeight = Dimensions.get('window').height

  // Debounce search text to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText && searchText.trim().length >= 2) {
        setDebouncedText(searchText.trim())
      } else {
        setDebouncedText('')
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchText])

  // Search location query
  const {
    data: suggestions = [],
    isFetching,
    error: searchError,
  } = useSearchLocationQuery(
    {
      text: debouncedText,
      maxResults,
      language,
      countries,
    },
    {
      skip: !debouncedText || debouncedText.length < 2,
    }
  )

  const handleInputPress = useCallback(() => {
    setFieldTouched(name)
    toggleModalVisible()
    // Initialize search with current value if any, but don't trigger search immediately
    if (selectedValue) {
      setSearchText(selectedValue)
    } else {
      setSearchText('')
    }
  }, [name, setFieldTouched, toggleModalVisible, selectedValue])

  const handleSuggestionSelect = useCallback(
    (suggestion: LocationSuggestion) => {
      setFieldValue(name, suggestion.text)
      setSearchText('')
      toggleModalVisible()
    },
    [name, setFieldValue, toggleModalVisible]
  )

  const handleModalClose = useCallback(() => {
    setSearchText('')
    toggleModalVisible()
  }, [toggleModalVisible])

  const renderSuggestion = ({ item }: { item: LocationSuggestion }) => (
    <TouchableOpacity
      style={tw`p-4 border-b border-gray-200 flex-row items-center`}
      onPress={() => handleSuggestionSelect(item)}
    >
      <MaterialCommunityIcons
        name="map-marker"
        size={18}
        color="#666"
        style={tw`mr-3`}
      />
      <Text style={tw`text-gray-900 flex-1`}>{item.text}</Text>
    </TouchableOpacity>
  )

  const error = errors[name]
  const visible = touched[name]

  return (
    <View>
      {/* Fake Input Field - triggers modal on press */}
      <TouchableWithoutFeedback onPress={handleInputPress}>
        <View
          style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-3 bg-white min-h-12`}
        >
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={20}
            color="#666"
            style={tw`mr-2`}
          />
          <Text
            style={[
              tw`flex-1`,
              selectedValue ? tw`text-gray-900` : tw`text-gray-400`,
            ]}
          >
            {selectedValue || placeholder}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color="#666" />
        </View>
      </TouchableWithoutFeedback>

      <Error
        error={typeof error === 'string' ? error : undefined}
        visible={typeof visible === 'boolean' ? visible : false}
      />

      {/* Location Search Modal */}
      <Modal
        visible={modalVisible}
        onRequestClose={handleModalClose}
        presentationStyle="pageSheet"
        animationType="slide"
        statusBarTranslucent={false}
      >
        {/* Search Input at Top */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[tw`h-full`]}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
        >
          <View style={tw``}>
            <View style={tw`p-4 bg-gray-50 border-b border-gray-200`}>
              <View style={tw`flex-row items-center justify-between mb-3`}>
                <Text style={tw`font-medium text-gray-900 text-lg`}>
                  Search Location
                </Text>
                <TouchableOpacity onPress={handleModalClose}>
                  <MaterialCommunityIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <View
                style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-3 bg-white`}
              >
                <MaterialCommunityIcons
                  name="magnify"
                  size={20}
                  color="#666"
                  style={tw`mr-2`}
                />
                <TextInput
                  style={tw`flex-1 text-gray-900`}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Start typing location..."
                  placeholderTextColor="#9CA3AF"
                  autoFocus
                  autoComplete="address-line1"
                />
                {searchText.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchText('')}
                    style={tw`ml-2`}
                  >
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Dynamic Search Results Area */}
            <View
              style={[
                tw`flex-shrink flex-grow-0`,
                {
                  maxHeight:
                    suggestions.length > 0
                      ? Math.min(
                          suggestions.length * 60 + 40,
                          screenHeight * 0.4
                        )
                      : 100,
                  minHeight: 60,
                },
              ]}
            >
              {isFetching ? (
                <View style={tw`p-8 items-center`}>
                  <MaterialCommunityIcons
                    name="loading"
                    size={24}
                    color="#666"
                  />
                  <Text style={tw`mt-2 text-gray-600`}>Searching...</Text>
                </View>
              ) : searchError ? (
                <View style={tw`p-8 items-center`}>
                  <MaterialCommunityIcons
                    name="alert-circle"
                    size={24}
                    color="#ef4444"
                  />
                  <Text style={tw`mt-2 text-red-600 text-center`}>
                    Error searching locations. Please try again.
                  </Text>
                </View>
              ) : suggestions.length > 0 ? (
                <FlatList
                  data={debouncedText ? suggestions : []}
                  renderItem={renderSuggestion}
                  keyExtractor={(item, index) => `${item.text}-${index}`}
                  showsVerticalScrollIndicator={false}
                  style={tw`flex-1`}
                />
              ) : searchText.trim().length >= 2 ? (
                <View style={tw`p-8 items-center`}>
                  <MaterialCommunityIcons
                    name="map-marker-off"
                    size={24}
                    color="#666"
                  />
                  <Text style={tw`mt-2 text-gray-600 text-center`}>
                    No locations found for "{searchText.trim()}"
                  </Text>
                  <Text style={tw`mt-1 text-gray-500 text-sm text-center`}>
                    Try a different search term
                  </Text>
                </View>
              ) : searchText.length > 0 ? (
                <View style={tw`p-8 items-center`}>
                  <MaterialCommunityIcons
                    name="map-search"
                    size={24}
                    color="#666"
                  />
                  <Text style={tw`mt-2 text-gray-600 text-center`}>
                    Type at least 2 characters to search
                  </Text>
                </View>
              ) : (
                <View style={tw`p-8 items-center`}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={24}
                    color="#666"
                  />
                  <Text style={tw`mt-2 text-gray-600 text-center`}>
                    Start typing to search for locations
                  </Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default LocationInput
