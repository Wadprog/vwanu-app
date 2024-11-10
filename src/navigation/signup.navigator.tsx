import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { getCurrentUser } from "../store/auth";
import MoreInfo from "../screens/MoreInfo.screen";
import FindFriends from "../screens/FindFriends";
import ProfilePicture from "../screens/ProfilePicture";
import RegisterScreen from "../screens/Register.screen";

const { Navigator, Screen } = createStackNavigator();

const RegisterNavigator = () => {
  const { registrationProcess } = useSelector(getCurrentUser);
  const screens = [MoreInfo, FindFriends, RegisterScreen, ProfilePicture];

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="SignUp-"
        component={() =>
          React.createElement(screens[registrationProcess], {
            handleSubmit: () => {},
          })
        }
      />
    </Navigator>
  );
};

export default RegisterNavigator;
