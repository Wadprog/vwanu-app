import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

const AccountScreen = () => <Text>My account screen</Text>;

const Stack = createStackNavigator();

const Account: React.FC<{}> = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Account" component={AccountScreen} />
  </Stack.Navigator>
);

export default Account;
