import { View, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Tabar from "./Tabar";
import Input from "./Input";
import tw from "../lib/tailwind";
import useToggle from "hooks/useToggle";

interface MenuTopProps {
  titles: string[];
  onSelectTab: (index: number) => void;
}
const MenuTop: React.FC<MenuTopProps> = (props) => {
  const [isSearch, toggleSearch] = useToggle(false);

  return (
    <View style={tw`flex flex-row justify-between items-center h-15`}>
      {isSearch ? (
        <Input
          placeholder="Search community by name"
          style={tw`mb-0 w-[370px] rounded-2xl`}
          iconLeft={
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
          }
        />
      ) : (
        <Tabar titles={props.titles} onSelectTab={props.onSelectTab} />
      )}
      <TouchableOpacity onPress={toggleSearch}>
        <MaterialCommunityIcons
          name={!isSearch ? "magnify" : "close"}
          size={24}
          color="black"
          style={tw``}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MenuTop;
