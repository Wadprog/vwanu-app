import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom import
import tw from '../lib/tailwind';

const select = tw`flex flex-row  items-center bg-gray-400`;
const notSelect = tw`flex flex-row  items-center bg-gray-300`;

const SelecTableItems = ({ item, onSelect, onDeselect, selected, type }) => {
  const design = selected ? select : notSelect;
  switch (type) {
    case 'word':
      return (
        <View style={[design, tw`my-1 mx-1`]}>
          <TouchableOpacity
            style={tw`bg-gray-500`}
            onPress={() => onDeselect(item)}
          >
            <MaterialCommunityIcons
              name="close"
              style={tw`m-2 text-white text-2xl `}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
          >
            <Text
              style={tw`text-white text-2xl ml-2 font-bold w-full bg-red-500`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    default:
      return (
        <View style={[design, tw`my-1 mx-1`]}>
          <TouchableOpacity
            style={tw`bg-gray-500`}
            onPress={() => onDeselect(item)}
          >
            <MaterialCommunityIcons
              name="close"
              style={tw`m-2 text-white text-2xl `}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
          >
            <Text
              style={tw`m-2 text-white text-2xl ml-2 font-bold w-full bg-red-500`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
  }
};
SelecTableItems.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};
export default SelecTableItems;
