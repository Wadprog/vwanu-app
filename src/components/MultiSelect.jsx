import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
// Custom import
import tw from '../lib/tailwind';
import SelecTableItems from './SelectedItems';
import Button from './Button';

export default function MultiSelect({
  items,
  placeholder,
  onValueChange,
  containerStyle,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleValueChange = (item, action) => {
    let itemSelected = [];
    if (action === 'select') {
      itemSelected = [...selectedItems, item];
      setSelectedItems(itemSelected);
    } else {
      itemSelected = selectedItems.filter((i) => i.id !== item.id);
      setSelectedItems(itemSelected);
    }
    if (onValueChange) onValueChange(itemSelected);
  };
  return (
    <View
      style={[
        tw`bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200 p-5`,
        containerStyle,
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
      <Modal visible={modalVisible} presentationStyle="formSheet">
        <SafeAreaView>
          <View style={[tw`p-1  h-full`]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`flex flex-row justify-end `}
            >
              <MaterialCommunityIcons
                name="close"
                style={tw`m-2 text-cs-primary text-3xl`}
              />
            </TouchableOpacity>
            <Text style={tw`text-cs-primary text-lg font-bold mb-2`}>
              Pick as many items you want
            </Text>
            <View style={tw`flex justify-between  flex-1`}>
              <View style={tw`flex max-h-5/6  overflow-hidden`}>
                <FlatList
                  data={items}
                  renderItem={({ item }) => (
                    <SelecTableItems
                      item={item}
                      onSelect={() => handleValueChange(item, 'select')}
                      onDeselect={() => handleValueChange(item, 'deselect')}
                      selected={selectedItems.includes(item)}
                    />
                  )}
                />
              </View>
              <View style={tw`justify-self-end`}>
                <Button title="done" onPress={() => setModalVisible(false)} />
              </View>
            </View>
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
  containerStyle: PropTypes.object,
};
