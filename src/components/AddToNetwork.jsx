import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
// Custom Imports
import ImageInput from './ImageInput';
import tw from '../lib/tailwind';

const AddToNetwork = ({ user, onRemove, onAdd, selected }) => (
  <View style={tw`relative`}>
    {selected ? (
      <TouchableWithoutFeedback onPress={() => onRemove(user)}>
        <View
          style={tw`flex items-center justify-center bg-gray-900 w-30 h-30 rounded-[45px]  z-10 absolute top-2 left-2 opacity-60`}
        >
          <MaterialCommunityIcons
            name="check"
            size={60}
            color={tw.color('text-green-500')}
          />
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback style={tw``} onPress={() => onAdd(user)}>
        <View
          style={tw`flex justify-center w-full h-full bg-red-500 rounded-[45px] absolute z-10 opacity-0`}
        />
      </TouchableWithoutFeedback>
    )}

    <View>
      <ImageInput
        disableChangeImage
        uri={user?.profilePicture}
        style={tw`mb-0`}
      />
    </View>

    <Text
      style={tw`text-center text-cs-primary capitalize text-md font-semibold`}
    >
      some one else
    </Text>
  </View>
);
AddToNetwork.propTypes = {
  selected: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
export default AddToNetwork;
