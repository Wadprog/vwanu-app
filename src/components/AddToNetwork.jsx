import React from "react";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableWithoutFeedback, ImageBackground } from "react-native";
// Custom Imports

import tw from "../lib/tailwind";
import Text from "./Text";

const AddToNetwork = ({ user, onRemove, onAdd, selected }) => (
  <View style={tw` w-[106px] h-[118px] rounded-2xl overflow-hidden m-1`}>
    {selected ? (
      <TouchableWithoutFeedback onPress={() => onRemove(user)}>
        <View
          style={tw`flex items-center justify-center bg-blue-200 w-full h-full z-2 absolute opacity-70`}
        >
          <View
            style={tw`bg-primary w-8 h-8 rounded-full border-4 border-white flex items-center justify-center`}
          >
            <MaterialCommunityIcons
              name="check"
              size={24}
              color={tw.color("text-white font-bold")}
              selectionColor={tw`bg-red-500`}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback style={tw``} onPress={() => onAdd(user)}>
        <View
          style={tw`flex justify-center w-full h-full bg-red-500 rounded-[45px] absolute z-10 opacity-0`}
        />
      </TouchableWithoutFeedback>
    )}
    <ImageBackground
      source={{ uri: user?.profilePicture }}
      style={tw`h-full flex flex-1 `}
    >
      <View style={tw`flex-1`} />
      <Text
        style={tw`bottom-3 text-right mr-2 leading-6 font-light text-lg truncate text-nowrap z-3`}
      >
        Namee
      </Text>
    </ImageBackground>
  </View>
);

export default AddToNetwork;

AddToNetwork.propTypes = {
  selected: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
