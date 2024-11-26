import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatScreen from "../screens/Chat";
import Message from "screens/Chat/Message";

const Stack = createStackNavigator();

const options = {
  headerTitle: "",
  headerShown: true,
  headerTransparent: false,
  headerStyle: { height: 100 },
};
const ChatNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Chat" component={ChatScreen} options={options} />

    <Stack.Screen name="message" component={Message} options={options} />
  </Stack.Navigator>
);

export default ChatNavigator;
