import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Custom core imports
import TimelineScreen from "../screens/timeline/Timeline.screen";
import ImageGallery from "../screens/timeline/ImageGallery.screen";
import CommentScreen from "../screens/timeline/Comment.screen";

import { FeedStackParams } from "../../types";

const Stack = createStackNavigator<FeedStackParams>();

const TimelineNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTransparent: true,
    }}
  >
    <Stack.Screen name="Timeline" component={TimelineScreen} />
    <Stack.Screen
      name="Gallery"
      options={{
        title: "just",
      }}
      component={ImageGallery}
    />
    <Stack.Screen name="Comment" component={CommentScreen} />
  </Stack.Navigator>
);

export default TimelineNavigator;
