import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatScreen from "../screens/Chat";

const Stack = createStackNavigator();

const ChatNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Chat" component={ChatScreen} />
  </Stack.Navigator>
);

export default ChatNavigator;
