import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import tw from "../lib/tailwind";
import Text from "../components/Text";
import { boarded } from "../store/auth";
import BoardingScreen from "../screens/Boarding";

const { Navigator, Screen } = createStackNavigator();

const Account = () => {
  const dispatch = useDispatch();
  return (
    <Navigator
      screenOptions={{
        title: "",
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerRight: () => (
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => {
              // @ts-ignore
              dispatch(boarded());
            }}
          >
            <Text appearance="hint">Skip</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={tw.color("gray-500")}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Screen name="My Account" component={BoardingScreen} />
    </Navigator>
  );
};

export default Account;