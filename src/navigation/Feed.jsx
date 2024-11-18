import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Custom core imports
import TimelineScreen from "../screens/timeline/Timeline.screen";
import ImageGallery from "../screens/timeline/ImageGallery.screen";

const Stack = createStackNavigator();

const TimelineNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="My Feeds" component={TimelineScreen} />
    <Stack.Screen name="gallery" component={ImageGallery} />
  </Stack.Navigator>
);

export default TimelineNavigator;
