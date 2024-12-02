/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Custom imports
import routes from "./routes";
import BottomTabNavigator from "./Bottom";
import DrawerContent from "../screens/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNav = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{
      headerTransparent: true,
      headerTitle: "",
    }}
  >
    <Drawer.Screen name={routes.BOTTOM_TAB} component={BottomTabNavigator} />
  </Drawer.Navigator>
);

export default DrawerNav;
