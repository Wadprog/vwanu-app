import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Custom core imports
import TimelineScreen from '../screens/Timeline.screen';

const Stack = createStackNavigator();

const TimelineNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Feeds" component={TimelineScreen} />
  </Stack.Navigator>
);

export default TimelineNavigator;
