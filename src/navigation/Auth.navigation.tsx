import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import SignupNavigator from "./signup.navigator";
import LoginScreen from "../screens/Login.screen";
import LoginOrCreateAccountScreen from "../screens/LoginOrCreateAccountScreen.screen";

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator: React.FC<{}> = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen
      name={routes.LOGIN_OR_CREATE_ACCOUNT}
      component={LoginOrCreateAccountScreen}
    />
    <Screen name={routes.LOGIN} component={LoginScreen} />
    <Screen name={routes.SIGN_UP} component={SignupNavigator} />
  </Navigator>
);

export default AuthNavigator;
