import { View, TouchableOpacity, FlatList } from "react-native";

import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

// Custom import
import Text from "./Text";
import Modal from "./Modal";
import tw from "../lib/tailwind";
import Wrapper from "./InputsWrapper";
import SelecTableItems from "./SelectedItems";

export default function MultiSelect({
  items,
  placeholder,
  onValueChange,
  style,
  inconLeft,
  label,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleValueChange = (item, action) => {
    let itemSelected = [];
    if (action === "select") {
      itemSelected = [...selectedItems, item];
      setSelectedItems(itemSelected);
    } else {
      itemSelected = selectedItems.filter((i) => i.id !== item.id);
      setSelectedItems(itemSelected);
    }
    if (onValueChange) onValueChange(itemSelected);
  };
  return (
    <Wrapper label={label}>
      <View
        style={[tw`bg-[#F2F2F2] p-2 my-1 border-[#006175] border`, style]}
        {...otherProps}
      >
        <View style={tw`flex flex-row items-center justify-between`}>
          {inconLeft && <View>{inconLeft}</View>}
          <View>
            {!selectedItems.length && (
              <Text style={tw`text-gray-400`}>
                {placeholder || "Selected area"}
              </Text>
            )}

            <View style={tw`flex flex-row flex-wrap`}>
              {selectedItems.map((item) => (
                <SelecTableItems
                  type="word"
                  item={item}
                  onDeselect={() => handleValueChange(item, "deselect")}
                  selected={selectedItems.includes(item)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => setModalVisible(false)}
        >
          <View style={[tw`p-1  h-full`]}>
            <Text
              category="c1"
              apperance="hint"
              style={tw`font-bold text-lg text-black text-cs-primary my-2`}
            >
              Pick as many items you want
            </Text>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <SelecTableItems
                  item={item}
                  onSelect={() => handleValueChange(item, "select")}
                  onDeselect={() => handleValueChange(item, "deselect")}
                  selected={selectedItems.includes(item)}
                />
              )}
            />
          </View>
        </Modal>
      </View>
    </Wrapper>
  );
}

MultiSelect.propTypes = {
  style: PropTypes.object,
  inconLeft: PropTypes.element,
  placeholder: PropTypes.string,
  containerStyle: PropTypes.object,
  items: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  label: PropTypes.string,
};
