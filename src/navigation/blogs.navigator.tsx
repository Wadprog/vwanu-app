import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Custom core imports

import BlogDetails from "screens/Blogs/BlogDetails";
import Blogs from "screens/Blogs/Blogs";
import { BlogStackParams } from "../../types";
import routes from "./routes";

const options = {
  headerTitle: "",
  headerShown: true,
  headerTransparent: false,
  headerStyle: { height: 100 },
};
const Stack = createStackNavigator<BlogStackParams>();

const TimelineNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTransparent: false,
    }}
  >
    <Stack.Screen name="BLOG_LIST" component={Blogs} options={options} />
    <Stack.Screen name={routes.BLOG_DETAILS} component={BlogDetails} />
  </Stack.Navigator>
);

export default TimelineNavigator;
