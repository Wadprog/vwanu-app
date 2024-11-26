import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Custom import
import Text from "./Text";
import tw from "../lib/tailwind";
import { ListItem } from "../../types";

interface SelecTableItemsProps {
  item: ListItem;
  onSelect: (item: ListItem) => void;
  onDeselect: (item: ListItem) => void;
  selected: boolean;
}

const Icon: React.FC<{}> = () => (
  <View style={tw`bg-gray-500 rounded-full  items-center justify-center`}>
    <MaterialCommunityIcons
      name="close"
      style={tw`m-1 text-white rounded-full  `}
    />
  </View>
);

const PillSelect: React.FC<Omit<SelecTableItemsProps, "onSelect">> = (
  props
) => (
  <TouchableOpacity
    style={tw` flex flex-row bg-gray-200 rounded-full items-center justify-center`}
    onPress={() => props.onDeselect(props.item)}
  >
    <Text style={tw`text-black  ml-2  pr-1`}>{props.item.label}</Text>
    <Icon />
  </TouchableOpacity>
);
const SelecTableItems: React.FC<SelecTableItemsProps> = (props) => (
  <TouchableOpacity
    onPress={() => {
      props.selected
        ? props.onDeselect(props.item)
        : props.onSelect(props.item);
    }}
    style={tw`flex flex-row items-center justify-between w-full px-1 py-2`}
  >
    <Text style={tw`m-2 text-primary`}>{props.item.label}</Text>
    {props.selected && <Icon />}
  </TouchableOpacity>
);

export { SelecTableItems, PillSelect };
