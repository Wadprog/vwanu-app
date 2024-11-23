import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParams } from "../../types";

import Profile from "screens/Profile";
import routes from "navigation/routes";

const Stack = createStackNavigator<ProfileStackParams>();

const Account: React.FC<{}> = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTransparent: true,
    }}
  >
    <Stack.Screen name={routes.PROFILE} component={Profile} />
  </Stack.Navigator>
);

export default Account;
