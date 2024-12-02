import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "navigation/routes";
import CommunityScreen from "screens/Community";
import CommunityDetails from "screens/Community/CommunityDetails";

const Stack = createStackNavigator();

const options = {
  headerTitle: "",
  headerShown: true,
  headerTransparent: true,
  headerStyle: { height: 100 },
};
const ChatNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen
      name={routes.COMMUNITY_SCREEN}
      component={CommunityScreen}
      options={options}
    />
    <Stack.Screen
      name={routes.COMMUNITY_DETAILS}
      component={CommunityDetails}
      options={options}
    />
  </Stack.Navigator>
);

export default ChatNavigator;
