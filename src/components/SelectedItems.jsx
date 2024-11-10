import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Custom import
import tw from "../lib/tailwind";
import Text from "./Text";

const select = tw`flex flex-row  items-center bg-gr0`;
const notSelect = tw`flex flex-row  items-center `;

const SelecTableItems = ({ item, onSelect, onDeselect, selected, type }) => {
  const design = selected ? select : notSelect;
  switch (type) {
    case "word":
      return (
        <View
          style={[
            design,
            tw`my-1 mx-1 py-1 bg-gray-200 rounded-full overflow-hidden`,
          ]}
        >
          <Text style={tw`text-black  ml-2  pr-1`}>{item}</Text>
          <TouchableOpacity
            style={tw`bg-gray-300 rounded-full  items-center justify-center`}
            onPress={() => onDeselect(item)}
          >
            <MaterialCommunityIcons
              name="close"
              style={tw`m-2 text-white text-md font-bold `}
            />
          </TouchableOpacity>
        </View>
      );
    default:
      return (
        <View
          style={[design, tw`my-1 mx-1 rounded-2 justify-between items-center`]}
        >
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
          >
            <Text style={tw`m-2 text-primary w-full `}>{item}</Text>
          </TouchableOpacity>
          {selected && (
            <TouchableOpacity
              style={tw`bg-gray-500 rounded-full  items-center justify-center`}
              onPress={() => onDeselect(item)}
            >
              <MaterialCommunityIcons
                name="close"
                style={tw`m-1 text-white rounded-full  `}
              />
            </TouchableOpacity>
          )}
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
