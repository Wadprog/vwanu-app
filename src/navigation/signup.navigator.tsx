import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { getCurrentUser } from "../store/auth";
import {
  FindFriendScreen,
  MoreInfoScreen,
  RegisterScreen,
  ProfilePictureScreen,
} from "../screens/registrations";

const { Navigator, Screen } = createStackNavigator();

const RegisterNavigator = () => {
  const { registrationProcess } = useSelector(getCurrentUser);
  const screens = [
    RegisterScreen,
    MoreInfoScreen,
    FindFriendScreen,
    ProfilePictureScreen,
  ];

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="SignUp-"
        // @ts-ignore
        component={
          // @ts-ignore
          screens[registrationProcess]
          //React.createElement(screens[registrationProcess], {
          // handleSubmit: () => {},
        }
      />
    </Navigator>
  );
};

export default RegisterNavigator;
