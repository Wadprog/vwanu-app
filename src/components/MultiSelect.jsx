import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
// Custom import
import tw from '../lib/tailwind';
import SelecTableItems from './SelectedItems';

export default function MultiSelect({
  items,
  placeholder,
  onValueChange,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleValueChange = (item, action) => {
    let selected = [];
    if (action === 'select') {
      selected = [...selectedItems, item];
      setSelectedItems(selected);
    } else {
      selected = selectedItems.filter((i) => i.id !== item.id);
      setSelectedItems(selected);
    }
    if (onValueChange) onValueChange(selected);
  };
  return (
    <View
      style={[
        tw`bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200 p-5`,
      ]}
      {...otherProps}
    >
      <View style={tw`flex flex-row items-center justify-between`}>
        <MaterialCommunityIcons name="apps" size={20} />
        <View>
          {!selectedItems.length && (
            <Text style={tw`text-gray-400`}>
              {placeholder || 'Selected area'}
            </Text>
          )}

          <View style={tw`flex flex-row flex-wrap`}>
            {selectedItems.map((item) => (
              <SelecTableItems
                type="word"
                item={item}
                onDeselect={() => handleValueChange(item, 'deselect')}
                selected={selectedItems.includes(item)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="chevron-down" size={20} />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible}>
        <SafeAreaView>
          <View style={tw`p-3`}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`flex flex-row justify-end`}
            >
              <MaterialCommunityIcons
                name="close"
                style={tw`m-2 text-cs-primary text-3xl`}
              />
            </TouchableOpacity>
            <Text>Select as many items you want</Text>
            {items.map((item) => (
              <SelecTableItems
                item={item}
                onSelect={() => handleValueChange(item, 'select')}
                onDeselect={() => handleValueChange(item, 'deselect')}
                selected={selectedItems.includes(item)}
              />
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

MultiSelect.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
