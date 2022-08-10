import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Text } from 'react-native';

const ChatScreen = () => <Text>My Chat screen</Text>;

const Stack = createStackNavigator();

const ChatNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Chat" component={ChatScreen} />
  </Stack.Navigator>
);

export default ChatNavigator;
