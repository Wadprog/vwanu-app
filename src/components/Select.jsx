import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// Custom import
import tw from '../lib/tailwind';

export default function Select({
  items,
  placeholder,
  onValueChange,
  ...otherProps
}) {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View
      style={[
        tw`bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200 p-5 my-2`,
      ]}
      {...otherProps}
    >
      <View style={tw`flex flex-row items-center justify-between`}>
        <MaterialCommunityIcons name="apps" size={20} />
        <View>
          {selectedItem ? (
            <Text>{selectedItem}</Text>
          ) : (
            <Text style={tw`text-gray-400`}>
              {placeholder || 'Pic an option'}
            </Text>
          )}
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
            <Text>Pick one option</Text>
            {items.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  onValueChange(item);
                  setModalVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
