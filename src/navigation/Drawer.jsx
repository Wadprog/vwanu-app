/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Custom imports
import DrawerContent from "../screens/DrawerContent";
import BottomTabNavigator from "./Bottom";
import routes from "./routes";

const Drawer = createDrawerNavigator();

const DrawerNav = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{
      title: "",
    }}
  >
    <Drawer.Screen name={routes.BOTTOM_TAB} component={BottomTabNavigator} />
  </Drawer.Navigator>
);

export default DrawerNav;
